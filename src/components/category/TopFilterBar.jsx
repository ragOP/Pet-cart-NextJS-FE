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

const BrandCard = ({ brand, selected }) => {
  return (
    <div className={cn("flex flex-col items-center gap-1 sm:gap-2 bg-[#E7F4F8] p-2 rounded-md cursor-pointer w-full h-24 sm:h-28 lg:w-32 lg:h-36 transition-colors", selected && "bg-[#0888B1] border-2 border-[#0888B1]")}>
      <img src={brand.image} alt={brand.value} className="h-12 sm:h-16 lg:h-24 object-contain" />
      <span className="text-xs sm:text-sm lg:text-base font-medium text-center line-clamp-2">{brand.label}</span>
    </div>
  );
};

export default function TopFilterBar({ filters, onChangeFilter, deleteFilter, selectedSubCategory, collections, onOpenFilterDrawer, productsData }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [open, setOpen] = useState(false);
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);

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
    {
      key: "breedSlug",
      label: "Breed",
      items: breeds.map((b) => ({
        label: b.name,
        value: b._id,
        image: b.image,
      })),
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
  ];

  const badgeLabels = convertFilterKeys(filters);

  return (
    <>
      <div className="sticky top-[120px] z-20 flex-col gap-3 bg-transparent lg:bg-white sm:p-4 rounded-md mx-2 sm:mx-0">
        {/* Desktop Filter Bar */}
        <div className="lg:flex items-center justify-between gap-3 hidden px-2">
          {/* Left side - Category, Selected Filters, and Veg/Non-Veg */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-black text-base font-semibold pl-2 pr-10">
              <span className="font-bold text-xl">
                {selectedSubCategory?.name || "Select Category"}
              </span>
            </div>

            {/* Veg/Non-Veg Toggle */}
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold transition-colors ${filters?.isVeg !== "true" ? "text-gray-900" : "text-green-600"
                }`}>
                {filters?.isVeg === "true" ? "Veg" : "Non-Veg"}
              </span>
              <Switch
                checked={filters?.isVeg === "true"}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChangeFilter({ isVeg: true });
                  } else {
                    onChangeFilter({ isVeg: null });
                  }
                }}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 scale-125"
              />

            </div>

            {/* Selected Filter Chips */}
            {badgeLabels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badgeLabels.map((badge, index) => {
                  let displayLabel = badge.label;

                  // Special handling for different filter types
                  if (badge.key === "collectionSlug" && filters?.collectionSlug) {
                    const selectedCollection = collections?.find(c => c.slug === filters.collectionSlug);
                    displayLabel = selectedCollection ? `${selectedCollection.name}` : `${filters.collectionSlug}`;
                  } else if (badge.key === "brandSlug" && filters?.brandSlug) {
                    displayLabel = `Brand: ${filters.brandSlug}`;
                  } else if (badge.key === "lifeStage" && filters?.lifeStage) {
                    displayLabel = `Life Stage: ${filters.lifeStage}`;
                  } else if (badge.key === "breedSize" && filters?.breedSize) {
                    displayLabel = `Breed Size: ${filters.breedSize}`;
                  } else if (badge.key === "productType" && filters?.productType) {
                    displayLabel = `Product Type: ${filters.productType}`;
                  } else if (badge.key === "rating" && filters?.rating) {
                    displayLabel = `Rating: ${filters.rating}+`;
                  }

                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                      onClick={() => deleteFilter(badge.key)}
                    >
                      {displayLabel}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right side - Empty space for balance */}
          <div className="flex-1"></div>

          {/* Right side - Filter and Sort buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop Filter Button */}
            <Button
              variant="outline"
              onClick={() => {
                const filterTrigger = document.querySelector('[data-filter-trigger]');
                if (filterTrigger) {
                  filterTrigger.click();
                }
              }}
              className="text-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

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
          <div className="flex items-center justify-between py-4 bg-white">
            <div className="flex items-center gap-2 text-black text-base font-semibold">
              <span className="font-bold text-xl">
                {selectedSubCategory?.name || "Select Category"}
              </span>
            </div>
            
            {/* Mobile Veg/Non-Veg Toggle */}
            <div className="flex items-center gap-2 pr-2">
              <span className={`text-sm font-semibold transition-colors ${filters?.isVeg !== "true" ? "text-gray-900" : "text-green-600"
                }`}>
                {filters?.isVeg === "true" ? "Veg" : "Non-Veg"}
              </span>
              <Switch
                checked={filters?.isVeg === "true"}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChangeFilter({ isVeg: true });
                  } else {
                    onChangeFilter({ isVeg: null });
                  }
                }}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 scale-125"
              />
            </div>
          </div>
          
          {/* Mobile Selected Filter Chips */}
          {badgeLabels.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {badgeLabels.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                  onClick={() => deleteFilter(badge.key)}
                >
                  {badge.label}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
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
                  const filterTrigger = document.querySelector('[data-filter-trigger]');
                  if (filterTrigger) {
                    filterTrigger.click();
                  }
                }}
                className="w-full h-12 border-0 rounded-none bg-[#fff] hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold text-gray-800">FILTER</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        direction="right"
        width={typeof window !== 'undefined' && window.innerWidth < 768 ? "90%" : "50%"}
        className="p-4 sm:p-6 flex flex-col h-full overflow-hidden"
        overlayClassName="z-50"
      >
        <div className="flex items-center gap-2 w-full border-b-2 border-[#6A6868] pb-4 sm:pb-6">
          <SlidersHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-bold text-lg sm:text-xl">Filters</span>
        </div>

        <div className="w-full flex-1 overflow-y-auto pr-2">
          <div className="w-full">
            {filterTabs.map((tab, index) => (
              <div key={tab.key} className="flex flex-col border-b border-[#B4B3B3]">
                <button
                  className={`w-full text-left py-2 text-sm font-medium pt-6`}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xl font-medium">{tab.label}</span>
                </button>
                <div className="flex space-x-2 pb-3">
                  {["brandSlug"].includes(tab.key) ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 cursor-pointer">
                      {tab.items.map((item) => (
                        <div
                          key={item.value}
                          onClick={() => {
                            setSelectedBrand(item);
                            onChangeFilter({
                              [tab.key]:
                                filters?.[tab.key] === item.value ? null : item.value,
                            })
                          }}
                        >
                          <BrandCard brand={item} selected={selectedBrand?.value === item.value} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {tab.items.map((item) => (
                        <Button
                          key={item.value}
                          variant={
                            filters?.[tab.key] === item.value ? "default" : "ghost"
                          }
                          onClick={() => {
                            onChangeFilter({
                              [tab.key]:
                                filters?.[tab.key] === item.value ? null : item.value,
                            })
                            setOpen(false)
                          }}
                          className={cn("w-auto min-w-[100px] sm:w-28 cursor-pointer flex justify-center text-center text-xs sm:text-sm p-2 bg-[#E7F4F8] border-2 border-[#BBDEE9] hover:bg-[#0888B1] hover:border-2 hover:border-[#0888B1]", filters?.[tab.key] === item.value ? "bg-[#0888B1] border-2 border-[#0888B1]" : "")}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>

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


