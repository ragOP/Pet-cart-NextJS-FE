"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/app/apis/getBrands";
import { getBreeds } from "@/app/apis/getBreeds";
import { SlidersHorizontal, X, Filter } from "lucide-react";
import { convertFilterKeys } from "@/utils/convert_filter_keys";
import unslug from "@/utils/unslug";
import { Drawer } from "../common/CustomDrawer";
import {
  Drawer as ShadcnDrawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose
} from "@/components/ui/drawer";
import VegSwitchButton from "../common/VegSwitchButton";

const BrandCard = ({ brand, selected }) => {
  return (
    <div className={cn("flex flex-col items-center justify-between bg-[#E7F4F8] px-2 pt-2 rounded-md cursor-pointer w-full min-h-24 transition-colors", selected && "bg-[#0888B1] border-2 border-[#0888B1]")}>
      <div className="flex justify-center items-center flex-1">
        <img src={brand.image} alt={brand.value} className="h-12 sm:h-16 lg:h-24 object-contain" />
      </div>
      <div className="w-full px-1 py-1">
        <span className="text-xs sm:text-sm lg:text-base font-medium text-center leading-tight block" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{brand.label}</span>
      </div>
    </div>
  );
};

export default function TopFilterBar({ filters, onChangeFilter, deleteFilter, selectedSubCategory, collections, onOpenFilterDrawer, productsData }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [open, setOpen] = useState(false);
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);
  const [highlightedFilter, setHighlightedFilter] = useState(null);

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: res => res?.data?.data || [],
  });

  const { data: breeds = [] } = useQuery({
    queryKey: ["breeds"],
    queryFn: getBreeds,
    select: res => res?.data?.data || [],
  });

  const filterTabs = [
    {
      key: "brandSlug",
      label: "Brand",
      items: brands.map((b) => ({
        label: b.name,
        value: b.slug,
        image: b.logo,
      })),
    },
    // {
    //   key: "breedSlug",
    //   label: "Breed",
    //   items: breeds.map((b) => ({
    //     label: b.name,
    //     value: b.slug,
    //     image: b.image,
    //   })),
    // },
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
      key: "rating",
      label: "Rating",
      items: [
        { label: "1 Star", value: "1" },
        { label: "2 Star", value: "2" },
        { label: "3 Star", value: "3" },
        { label: "4 Star", value: "4" },
        { label: "5 Star", value: "5" },
      ],
    },
  ];

  const badgeLabels = convertFilterKeys(filters);

  return (
    <>
      <div className="sticky top-[120px] z-20 shadow-sm flex-col gap-3 bg-transparent lg:bg-white sm:p-4 px-2 sm:mx-0">
        {/* Desktop Filter Bar */}
        <div className="lg:flex items-center justify-between gap-3 hidden px-2">
          {/* Left side - Category, Selected Filters, and Veg/Non-Veg */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-black text-base font-semibold pl-2 pr-10">
              <span className="font-bold text-xl">
                {selectedSubCategory?.name || "Select Category"}
              </span>
            </div>

            {/* Veg Filter with VegSwitchButton */}
            <div className="flex items-center gap-2">
              <VegSwitchButton
                value={filters?.isVeg === "true"}
                onValueChange={(checked) => {
                  if (checked) {
                    onChangeFilter({ isVeg: true });
                  } else {
                    onChangeFilter({ isVeg: null });
                  }
                }}
              />
            </div>

            {/* Filter Category Chips */}
            <div className="flex flex-wrap gap-2 pl-8">
              {filterTabs.map((tab) => {
                const currentValues = filters?.[tab.key] ? (Array.isArray(filters[tab.key]) ? filters[tab.key] : [filters[tab.key]]) : [];
                const isSelected = currentValues.length > 0;
                const count = currentValues.length;

                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setHighlightedFilter(tab.key);
                      setOpen(true);
                    }}
                    className={`px-3 py-[0.4rem] rounded-md text-sm font-medium transition-colors ${isSelected
                      ? 'bg-[#fef3e2] border border-[#f19813] text-[#f19813]'
                      : 'bg-gray-200 border border-gray-300 text-gray-600 hover:bg-gray-300'
                      }`}
                  >
                    {tab.label} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side - Empty space for balance */}
          <div className="flex-1"></div>

          {/* Right side - Filter and Sort buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop Filter Button */}


            {/* Sort By */}
            <Select
              onValueChange={(value) => onChangeFilter({ sort_by: value })}
              defaultValue={filters?.sort_by}
            >
              <SelectTrigger className="w-[200px] text-sm">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Category and Veg Toggle - Above Products */}
        <div className="lg:hidden z-10 bg-white w-full">
          <div className="flex items-center justify-between pb-3 px-4 pt-5 bg-white">
            <div className="flex items-center gap-2 text-black text-base font-semibold">
              <span className="font-bold text-xl">
                {selectedSubCategory?.name || "Select Category"}
              </span>
            </div>

            {/* Mobile Veg Filter with VegSwitchButton */}
            <div className="flex items-center gap-2 pr-2">
              <div className="scale-90">
                <VegSwitchButton
                  value={filters?.isVeg === "true"}
                  onValueChange={(checked) => {
                    if (checked) {
                      onChangeFilter({ isVeg: true });
                    } else {
                      onChangeFilter({ isVeg: null });
                    }
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Fixed Mobile Filter Bar at Bottom */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#fff] shadow-lg border-t border-gray-200">
          <div className="flex">
            {/* Sort Button */}
            <div className="flex-1 border-r border-gray-200">
              <Button
                variant="ghost"
                onClick={() => setSortDrawerOpen(true)}
                className="w-full h-12 border-0 rounded-none bg-[#fff] hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold text-gray-800">SORT</span>
                </div>
              </Button>
            </div>

            {/* Filter Button */}
            <div className="flex-1">
              <Button
                variant="ghost"
                onClick={() => {
                  setHighlightedFilter(null);
                  setOpen(true);
                }}
                className="w-full h-12 border-0 rounded-none bg-[#fff] hover:bg-gray-50 relative"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold text-gray-800">FILTER</span>
                  {(() => {
                    const totalFilterCount = filterTabs.reduce((total, tab) => {
                      const currentValues = filters?.[tab.key] ? (Array.isArray(filters[tab.key]) ? filters[tab.key] : [filters[tab.key]]) : [];
                      return total + currentValues.length;
                    }, 0);
                    return totalFilterCount > 0 ? (
                      <span className="bg-[#f19813] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {totalFilterCount}
                      </span>
                    ) : null;
                  })()}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Drawer - Identical to Mobile Design */}
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
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold uppercase">Brand</h3>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {filterTabs.find(t => t.key === "brandSlug")?.items?.map((item) => (
                      <div
                        key={item.value}
                        onClick={() => {
                          setSelectedBrand(item);
                          const currentValues = filters?.brandSlug ? (Array.isArray(filters.brandSlug) ? filters.brandSlug : [filters.brandSlug]) : [];
                          const newValues = currentValues.includes(item.value)
                            ? currentValues.filter(v => v !== item.value)
                            : [...currentValues, item.value];
                          onChangeFilter({
                            brandSlug: newValues.length > 0 ? newValues : null,
                          });
                        }}
                        className={`px-2  pt-2 border rounded-lg cursor-pointer text-center transition-colors h-20 flex flex-col justify-between ${(() => {
                          const currentValues = filters?.brandSlug ? (Array.isArray(filters.brandSlug) ? filters.brandSlug : [filters.brandSlug]) : [];
                          return currentValues.includes(item.value);
                        })()
                          ? 'border-[#f19813] bg-[#fef3e2]'
                          : 'border-[#badee9] bg-[#e6f3f7] hover:border-[#0b88b1]'
                          }`}
                      >
                        <div className="flex justify-center items-center flex-1">
                          <img src={item.image} alt={item.label} className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-xs font-medium mt-1 line-clamp-2">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Breed Filter - Commented out for now */}
                {/* <div className="border-b border-gray-200 pb-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold uppercase">Breed</h3>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {filterTabs.find(t => t.key === "breedSlug")?.items?.map((item) => (
                      <div
                        key={item.value}
                        onClick={() => {
                          const currentValues = filters?.breedSlug ? (Array.isArray(filters.breedSlug) ? filters.breedSlug : [filters.breedSlug]) : [];
                          const newValues = currentValues.includes(item.value) 
                            ? currentValues.filter(v => v !== item.value)
                            : [...currentValues, item.value];
                          onChangeFilter({
                            breedSlug: newValues.length > 0 ? newValues : null,
                          });
                        }}
                        className={`p-3 border rounded-lg cursor-pointer text-center transition-colors flex flex-col justify-center items-center min-w-[80px] flex-shrink-0 ${(Array.isArray(filters?.breedSlug) ? filters.breedSlug : filters?.breedSlug ? [filters.breedSlug] : []).includes(item.value)
                            ? 'border-[#f19813] bg-[#fef3e2]'
                            : 'border-[#badee9] bg-[#e6f3f7] hover:border-[#0b88b1]'
                          }`}
                      >
                        <div className="flex justify-center items-center flex-1">
                          <img src={item.image} alt={item.label} className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-xs font-medium mt-1 line-clamp-2">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Life Stage Filter */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-3 uppercase">Life Stage</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterTabs.find(t => t.key === "lifeStage")?.items?.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          const currentValues = filters?.lifeStage ? (Array.isArray(filters.lifeStage) ? filters.lifeStage : [filters.lifeStage]) : [];
                          const newValues = currentValues.includes(item.value)
                            ? currentValues.filter(v => v !== item.value)
                            : [...currentValues, item.value];
                          onChangeFilter({
                            lifeStage: newValues.length > 0 ? newValues : null,
                          });
                        }}
                        className={`h-10 px-4 rounded-full border font-medium transition-colors ${(() => {
                          const currentValues = filters?.lifeStage ? (Array.isArray(filters.lifeStage) ? filters.lifeStage : [filters.lifeStage]) : [];
                          return currentValues.includes(item.value);
                        })()
                          ? 'bg-[#fef3e2] text-[#f19813] border-[#f19813]'
                          : 'bg-[#e6f3f7] text-gray-700 border-[#badee9] hover:border-[#0b88b1]'
                          }`}
                      >
                        <span className="truncate">{item.label}</span>
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
                        onClick={() => {
                          const currentValues = filters?.breedSize ? (Array.isArray(filters.breedSize) ? filters.breedSize : [filters.breedSize]) : [];
                          const newValues = currentValues.includes(item.value)
                            ? currentValues.filter(v => v !== item.value)
                            : [...currentValues, item.value];
                          onChangeFilter({
                            breedSize: newValues.length > 0 ? newValues : null,
                          });
                        }}
                        className={`h-10 px-4 rounded-full border font-medium transition-colors ${(() => {
                          const currentValues = filters?.breedSize ? (Array.isArray(filters.breedSize) ? filters.breedSize : [filters.breedSize]) : [];
                          return currentValues.includes(item.value);
                        })()
                          ? 'bg-[#fef3e2] text-[#f19813] border-[#f19813]'
                          : 'bg-[#e6f3f7] text-gray-700 border-[#badee9] hover:border-[#0b88b1]'
                          }`}
                      >
                        <span className="truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Type Filter */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-3 uppercase">Product Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterTabs.find(t => t.key === "productType")?.items?.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          const currentValues = filters?.productType ? (Array.isArray(filters.productType) ? filters.productType : [filters.productType]) : [];
                          const newValues = currentValues.includes(item.value)
                            ? currentValues.filter(v => v !== item.value)
                            : [...currentValues, item.value];
                          onChangeFilter({
                            productType: newValues.length > 0 ? newValues : null,
                          });
                        }}
                        className={`h-10 px-4 rounded-full border font-medium transition-colors ${(() => {
                          const currentValues = filters?.productType ? (Array.isArray(filters.productType) ? filters.productType : [filters.productType]) : [];
                          return currentValues.includes(item.value);
                        })()
                          ? 'bg-[#fef3e2] text-[#f19813] border-[#f19813]'
                          : 'bg-[#e6f3f7] text-gray-700 border-[#badee9] hover:border-[#0b88b1]'
                          }`}
                      >
                        <span className="truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-3 uppercase">Rating</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterTabs.find(t => t.key === "rating")?.items?.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          const currentValues = filters?.rating ? (Array.isArray(filters.rating) ? filters.rating : [filters.rating]) : [];
                          const newValues = currentValues.includes(item.value)
                            ? currentValues.filter(v => v !== item.value)
                            : [...currentValues, item.value];
                          onChangeFilter({
                            rating: newValues.length > 0 ? newValues : null,
                          });
                        }}
                        className={`h-10 px-4 rounded-full border font-medium transition-colors ${(() => {
                          const currentValues = filters?.rating ? (Array.isArray(filters.rating) ? filters.rating : [filters.rating]) : [];
                          return currentValues.includes(item.value);
                        })()
                          ? 'bg-[#fef3e2] text-[#f19813] border-[#f19813]'
                          : 'bg-[#e6f3f7] text-gray-700 border-[#badee9] hover:border-[#0b88b1]'
                          }`}
                      >
                        <span className="truncate">{item.label}</span>
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
                  onClick={() => {
                    // Clear all filters except sort_by
                    const clearedFilters = {};
                    Object.keys(filters).forEach(key => {
                      if (key !== 'sort_by') {
                        clearedFilters[key] = null;
                      }
                    });
                    onChangeFilter(clearedFilters);
                    setOpen(false);
                  }}
                  className="text-[#f19813] font-bold text-base hover:text-[#d9820a] transition-colors"
                >
                  CLEAR ALL
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-[#f19813] text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-[#d9820a] transition-colors"
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Drawer */}
      <ShadcnDrawer
        open={sortDrawerOpen}
        onOpenChange={setSortDrawerOpen}
        direction="bottom"
      >
        <DrawerContent className="w-full max-h-[30vh] rounded-t-lg">
          <DrawerHeader className="flex flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
            <DrawerTitle className="text-lg font-semibold">Sort By</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="px-4 py-4 space-y-2">
            <Button
              variant={filters?.sort_by === "priceLowToHigh" ? "default" : "ghost"}
              onClick={() => {
                onChangeFilter({ sort_by: "priceLowToHigh" });
                setSortDrawerOpen(false);
              }}
              className="w-full justify-start h-12 text-left"
            >
              Price: Low to High
            </Button>
            <Button
              variant={filters?.sort_by === "priceHighToLow" ? "default" : "ghost"}
              onClick={() => {
                onChangeFilter({ sort_by: "priceHighToLow" });
                setSortDrawerOpen(false);
              }}
              className="w-full justify-start h-12 text-left"
            >
              Price: High to Low
            </Button>
          </div>
        </DrawerContent>
      </ShadcnDrawer>
    </>
  );
}


