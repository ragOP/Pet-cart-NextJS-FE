import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer as ShadcnDrawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";
import { Filter, X, XCircle, SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/app/apis/getBrands";
import { getBreeds } from "@/app/apis/getBreeds";

const promoImages = [
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=150&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=150&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=150&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=150&fit=crop&crop=center",
];

const BrandCard = ({ brand, selected }) => {
  return (
    <div
      className={cn(
        "rounded-lg border-2 p-2 sm:p-3 cursor-pointer transition-all duration-200 hover:shadow-md",
        selected
          ? "border-[#0888B1] bg-[#E7F4F8]"
          : "border-[#BBDEE9] bg-white hover:border-[#0888B1]"
      )}
    >
      <div className="flex flex-col items-center space-y-1 sm:space-y-2">
        <Image
          src={brand.image || "/placeholder-brand.png"}
          alt={brand.label}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-xs sm:text-sm lg:text-base font-medium text-center line-clamp-2">{brand.label}</span>
      </div>
    </div>
  );
};

export default function FilterSidebar({ collections, selectedSubCategory, onChangeFilter, filters, showDesktopSidebar = true, showMobileButton = true, isCollectionsLoading = false }) {
  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [tempFilters, setTempFilters] = useState({});

  // Count active filters (excluding UI-only filters)
  const getActiveFilterCount = () => {
    const excludedKeys = ['subCategorySlug', 'categorySlug', 'collectionSlug', 'isVeg', 'sort_by'];
    return Object.keys(filters).filter(key =>
      !excludedKeys.includes(key) &&
      filters[key] !== null &&
      filters[key] !== undefined &&
      filters[key] !== ""
    ).length;
  };

  const activeFilterCount = getActiveFilterCount();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);


  // Initialize temp filters when drawer opens
  React.useEffect(() => {
    if (open) {
      setTempFilters(filters || {});
    }
  }, [open, filters]);

  const handleTempFilterChange = (key, value) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value
    }));
  };

  const applyFilters = () => {
    onChangeFilter(tempFilters);
    setOpen(false);
  };

  const clearAllFilters = () => {
    const clearedFilters = {};
    Object.keys(tempFilters).forEach(key => {
      if (key !== 'sort_by') { // Keep sort_by, clear others
        clearedFilters[key] = undefined;
      }
    });
    setTempFilters(clearedFilters);
    onChangeFilter(clearedFilters);
    setOpen(false);
  };

  // Fetch brands
  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
    select: (res) => res?.data?.data || [],
  });

  // Fetch breeds
  const { data: breedsData } = useQuery({
    queryKey: ["breeds"],
    queryFn: () => getBreeds(),
    select: (res) => res?.data?.data || [],
  });

  // Filter tabs configuration - matching web version
  const filterTabs = [
    {
      key: "brandSlug",
      label: "Brand",
      items: brandsData?.map((brand) => ({
        value: brand.slug,
        label: brand.name,
        image: brand.logo || brand.image,
      })) || [],
    },
    {
      key: "breedSlug",
      label: "Breed",
      items: breedsData?.map((breed) => ({
        value: breed._id,
        label: breed.name,
        image: breed.image,
      })) || [],
    },
    {
      key: "rating",
      label: "Rating",
      items: [
        { label: "1 Star", value: 1 },
        { label: "2 Star", value: 2 },
        { label: "3 Star", value: 3 },
        { label: "4 Star", value: 4 },
        { label: "5 Star", value: 5 },
      ],
    },
    {
      key: "isVeg",
      label: "Diet Type",
      type: "slider",
      items: [
        { label: "Non-Veg", value: false, color: "#ef4444" },
        { label: "Veg", value: true, color: "#22c55e" },
      ],
    },
    {
      key: "lifeStage",
      label: "Life Stage",
      items: [
        { label: "Puppy", value: "Puppy" },
        { label: "Adult", value: "Adult" },
        { label: "Starter", value: "Starter" },
        { label: "Kitten", value: "Kitten" },
      ],
    },
    {
      key: "breedSize",
      label: "Breed Size",
      items: [
        { label: "Mini", value: "Mini" },
        { label: "Medium", value: "Medium" },
        { label: "Large", value: "Large" },
        { label: "Giant", value: "Giant" },
      ],
    },
    {
      key: "productType",
      label: "Product Type",
      items: [
        { label: "Wet Food", value: "Wet Food" },
        { label: "Dry Food", value: "Dry Food" },
        { label: "Food Toppers", value: "Food Toppers" },
        { label: "Treat", value: "Treat" },
      ],
    },
    {
      key: "collectionSlug",
      label: "Collection",
      items: collections?.map((collection) => ({
        value: collection.slug,
        label: collection.name,
      })) || [],
    },
  ];

  const FilterContent = ({ isMobile = false }) => {
    if (isMobile) {
      // Mobile version with all filters - simplified
      return (
        <div className="space-y-6">
          {filterTabs.map((tab) => (
            <div key={tab.key} className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-semibold mb-3">{tab.label}</h3>

              {tab.key === "brandSlug" ? (
                <div className="grid grid-cols-2 gap-3">
                  {tab.items.map((item) => (
                    <div
                      key={item.value}
                      onClick={() => {
                        setSelectedBrand(item);
                        handleTempFilterChange(tab.key, item.value);
                      }}
                      className="cursor-pointer"
                    >
                      <BrandCard brand={item} selected={tempFilters?.[tab.key] === item.value} />
                    </div>
                  ))}
                </div>
              ) : tab.type === "slider" ? (
                <div className="flex gap-2">
                  {tab.items.map((item) => (
                    <Button
                      key={item.value}
                      variant={tempFilters?.[tab.key] === item.value ? "default" : "outline"}
                      onClick={() => {
                        handleTempFilterChange(tab.key, item.value);
                      }}
                      className="flex-1 h-10"
                      style={item.color && tempFilters?.[tab.key] === item.value ? {
                        backgroundColor: item.color,
                        borderColor: item.color,
                        color: 'white'
                      } : {}}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tab.items.map((item) => (
                    <Button
                      key={item.value}
                      variant={tempFilters?.[tab.key] === item.value ? "default" : "outline"}
                      onClick={() => {
                        handleTempFilterChange(tab.key, item.value);
                      }}
                      className="h-10 px-4"
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>
      );
    }

    // Desktop version - keep original collections design
    return (
      <div className="space-y-2 px-2">
        {/* Collections Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Collections</h3>
          {filters?.collectionSlug && (
            <button
              onClick={() => {
                if (onChangeFilter) {
                  onChangeFilter({ collectionSlug: undefined });
                }
              }}
              className="text-xs text-red-600 hover:text-red-700 underline cursor-pointer transition-colors"
            >
              Remove
            </button>
          )}
        </div>

        {/* Collections */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="divide-y divide-gray-100">
            {collections?.map((collection, index) => {
              const isSelected = filters?.collectionSlug === collection.slug;
              return (
                <button
                  key={collection._id || index}
                  onClick={() => {
                    if (onChangeFilter) {
                      onChangeFilter({ collectionSlug: collection.slug });
                    }
                  }}
                  className={cn(
                    `w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors`,
                    isSelected ? "bg-gray-100" : ""
                  )}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={collection.image || "/placeholder-collection.png"}
                      alt={collection.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-800 uppercase text-sm">
                    {collection.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Collections Sidebar */}
      {showDesktopSidebar && (
        <aside className="w-[240px] space-y-4 hidden lg:block sticky top-[180px] self-start">
          <div className="space-y-2 px-2 mt-4">
            {/* Collections Header */}
            {/* <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Collections</h3>
              {filters?.collectionSlug && (
                <button
                  onClick={() => {
                    if (onChangeFilter) {
                      onChangeFilter({ collectionSlug: undefined });
                    }
                  }}
                  className="text-xs text-red-600 hover:text-red-700 underline cursor-pointer transition-colors"
                >
                  Remove
                </button>
              )}
            </div> */}

            {/* Collections */}
            <div className="bg-white rounded-lg border border-gray-200">
              {isCollectionsLoading ? (
                // Skeleton loader for collections
                <div className="divide-y divide-gray-100">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 animate-pulse">
                      <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                      <div className="h-4 bg-gray-100 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
              ) : collections?.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {collections.map((collection, index) => {
                    const isSelected = filters?.collectionSlug === collection.slug;
                    return (
                      <button
                        key={collection._id || index}
                        onClick={() => {
                          if (onChangeFilter) {
                            onChangeFilter({ collectionSlug: collection.slug });
                          }
                        }}
                        className={cn(
                          `w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors`,
                          isSelected ? "bg-gray-100" : ""
                        )}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={collection.image || "/placeholder-collection.png"}
                            alt={collection.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-800 uppercase text-sm">
                          {collection.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No collections found
                </div>
              )}
            </div>

            {/* Promotional Images Section - Desktop Only */}
            <div className="space-y-3 px-2 py-4">
              <div className="space-y-3">
                {promoImages.map((image, index) => (
                  <div key={index} className="rounded-sm overflow-hidden">
                    <Image
                      src={image}
                      alt={`Promo ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Filter Button - Both Mobile and Desktop */}
      {showMobileButton && (
        <div className="fixed top-4 left-4 z-20">
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50 relative"
            data-filter-trigger
            onClick={() => setOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
      )}

      {/* Filter Drawer - Both Mobile and Desktop */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setOpen(false)}>
          <div
            className="fixed right-0 top-0 w-full lg:w-[480px] h-screen bg-white flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-4 border-b bg-white flex-shrink-0">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content - Flex 1 */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                {/* Brand Filter */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold uppercase">Brand</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 underline">
                      view all
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {filterTabs.find(t => t.key === "brandSlug")?.items?.map((item) => (
                      <div
                        key={item.value}
                        onClick={() => {
                          setSelectedBrand(item);
                          handleTempFilterChange("brandSlug", item.value);
                        }}
                        className={`p-2 border rounded-lg cursor-pointer text-center transition-colors h-20 flex flex-col justify-between ${tempFilters?.brandSlug === item.value
                            ? 'border-[#0b88b1] bg-[#0b88b1] bg-opacity-10'
                            : 'border-[#badee9] bg-[#e6f3f7] hover:border-[#0b88b1]'
                          }`}
                      >
                        <div className="flex justify-center items-center flex-1">
                          <img src={item.image} alt={item.label} className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-xs font-medium mt-1">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Life Stage Filter */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-3 uppercase">Life Stage</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterTabs.find(t => t.key === "lifeStage")?.items?.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleTempFilterChange("lifeStage", item.value)}
                        className={`h-10 px-4 rounded-full border font-medium transition-colors ${tempFilters?.lifeStage === item.value
                            ? 'bg-[#0b88b1] text-white border-[#0b88b1]'
                            : 'bg-[#e6f3f7] text-gray-700 border-[#badee9] hover:border-[#0b88b1]'
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Breed Size Filter */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-3 uppercase">Breed Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterTabs.find(t => t.key === "breedSize")?.items?.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleTempFilterChange("breedSize", item.value)}
                        className={`h-10 px-4 rounded-full border font-medium transition-colors ${tempFilters?.breedSize === item.value
                            ? 'bg-[#0b88b1] text-white border-[#0b88b1]'
                            : 'bg-[#e6f3f7] text-gray-700 border-[#badee9] hover:border-[#0b88b1]'
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Buttons - Fixed */}
            <div className="flex-shrink-0 border-t bg-white p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={clearAllFilters}
                  className="text-[#f19813] font-bold text-base hover:text-[#d9820a] transition-colors"
                >
                  CLEAR ALL
                </button>
                <button
                  onClick={applyFilters}
                  className="bg-[#f19813] text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-[#d9820a] transition-colors"
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
