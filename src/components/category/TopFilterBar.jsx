"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/app/apis/getBrands";
import { getBreeds } from "@/app/apis/getBreeds";
import { SlidersHorizontal, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { convertFilterKeys } from "@/utils/convert_filter_keys";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function TopFilterBar({ filters, onChangeFilter, deleteFilter }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const { data: brands = [] } = useQuery({ queryKey: ["brands"], queryFn: getBrands, select: res => res?.data?.data || [] });
  const { data: breeds = [] } = useQuery({ queryKey: ["breeds"], queryFn: getBreeds, select: res => res?.data?.data || [] });

  const filterTabs = [
    {
      key: "brandSlug",
      label: "Brand",
      items: brands.map(b => ({ label: b.name, value: b.slug })),
    },
    {
      key: "breedSlug",
      label: "Breed",
      items: breeds.map(b => ({ label: b.name, value: b._id })),
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
    }
  ];

  const badgeLabels = convertFilterKeys(filters);

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-md">
      <div className="lg:flex flex-wrap items-center gap-3 hidden">
        <Button variant="ghost" className="gap-2 text-black font-semibold">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>

        {/* Price Range Slider */}
        <div className="flex flex-col gap-1 w-[200px]">
          <span className="text-sm font-medium text-muted-foreground">Price Range</span>
          <Slider
            value={[
              Number(filters?.min_price_range) || 0,
              Number(filters?.max_price_range) || 10000,
            ]}
            onValueChange={
              (value) => onChangeFilter({
                min_price_range: value[0],
                max_price_range: value[1],
              })
            }
          />
        </div>

        {/* Dynamic Popover Filters */}
        {filterTabs.map((tab) => (
          <Popover key={tab.key}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="text-sm" >{tab.label}</Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 w-40">
              {tab.items.map((item) => (
                <Button
                  key={item.value}
                  variant={filters?.[tab.key] === item.value ? "default" : "ghost"}
                  onClick={() =>
                    onChangeFilter({
                      [tab.key]: filters?.[tab.key] === item.value ? null : item.value,
                    })
                  }
                  className="w-full justify-start text-left text-sm"
                >
                  {item.label}
                </Button>
              ))}
            </PopoverContent>
          </Popover>
        ))}

        {/* Sort By */}
        <Select
          onValueChange={(value) => onChangeFilter({ sort_by: value })}
          defaultValue={filters?.sort_by}
        >
          <SelectTrigger className="w-[150px] text-sm">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="relevance">Relevance</SelectItem> */}
            <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
            {/* <SelectItem value="popularity">Popularity</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Filter Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(badgeLabels).map(([key, value]) => (
          <Badge
            key={key}
            variant="outline"
            className="text-sm flex items-center gap-1 hover:cursor-pointer"
            onClick={() => deleteFilter(key)}
          >
            {key}: {value}
            <X size={16} className="cursor-pointer" onClick={() => deleteFilter(key)} />
          </Badge>
        ))}
      </div>

      <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>

          {/* Two-column sidebar layout */}
          <div className="flex h-full">
            {/* Left Sidebar - Filter Tabs */}
            <div className="w-1/3 border-r">
              {filterTabs.map((tab, index) => (
                <button
                  key={tab.key}
                  className={`w-full text-left px-4 py-2 text-sm font-medium ${selectedTab === index ? "bg-gray-100 text-black" : "text-muted-foreground"
                    }`}
                  onClick={() => setSelectedTab(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right Content - Filter Options */}
            <div className="w-2/3 p-4 overflow-y-auto">
              {filterTabs[selectedTab]?.items?.map((item) => (
                <Button
                  key={item.value}
                  variant={filters?.[filterTabs[selectedTab].key] === item.value ? "default" : "ghost"}
                  onClick={() =>
                    onChangeFilter({
                      [filterTabs[selectedTab].key]:
                        filters?.[filterTabs[selectedTab].key] === item.value ? null : item.value,
                    })
                  }
                  className="w-full justify-start text-left text-sm mb-2"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={() => setIsFilterOpen(false)}>Apply</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>

      </Drawer>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-0 right-0 z-10 w-full bg-white">
        <Button onClick={() => setIsFilterOpen(true)} variant="outline" className="w-1/2 rounded-none ">
          Filters
        </Button>
        <Button onClick={() => setIsFilterOpen(true)} variant="outline" className="w-1/2 rounded-none ">
          Sort By
        </Button>
      </div>
    </div>
  );
}
