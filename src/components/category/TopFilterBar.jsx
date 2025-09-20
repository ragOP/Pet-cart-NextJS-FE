"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/app/apis/getBrands";
import { getBreeds } from "@/app/apis/getBreeds";
import { SlidersHorizontal, X } from "lucide-react";
import { convertFilterKeys } from "@/utils/convert_filter_keys";
import unslug from "@/utils/unslug";
import { Drawer } from "../common/CustomDrawer";

const BrandCard = ({ brand, selected }) => {
  return (
    <div className={cn("flex flex-col items-center gap-2 bg-[#E7F4F8] p-2 rounded-md cursor-pointer lg:w-32 lg:h-36", selected && "bg-[#0888B1] border-2 border-[#0888B1]")}>
      <img src={brand.image} alt={brand.value} className="h-24" />
      <span className="text-base font-medium">{brand.label}</span>
    </div>
  );
};

export default function TopFilterBar({ filters, onChangeFilter, deleteFilter }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [open, setOpen] = useState(false);

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
  ];

  const badgeLabels = convertFilterKeys(filters);

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-md">
      {/* Desktop Filter Bar */}
      <div className="lg:flex flex-wrap items-center gap-3 hidden">
        <Button variant="ghost" className="gap-2 text-black text-base font-semibold">
          <SlidersHorizontal size={24} />
          <span className="font-bold text-xl">Filters</span>
        </Button>

        {/* Filter Triggers */}
        {filterTabs.map((tab, index) => (
          <Button
            key={tab.key}
            variant="outline"
            onClick={() => {
              setOpen(true);
            }}
            className="text-sm"
          >
            {tab.label}
          </Button>
        ))}

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

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        direction="right"
        width="50%"
        className="p-6 flex flex-col h-full overflow-hidden"
        overlayClassName="z-50"
      >
        <div className="flex items-center gap-2 w-[50vw] border-b-2 border-[#6A6868] pb-6">
          <SlidersHorizontal size={24} />
          <span className="font-bold text-xl">Filters</span>
        </div>

        <div className="w-[50vw] flex-1 overflow-y-auto pr-2">
          <div className="w-full">
            {filterTabs.map((tab, index) => (
              <div className="flex flex-col border-b border-[#B4B3B3]">
                <button
                  key={tab.key}
                  className={`w-full text-left py-2 text-sm font-medium pt-6`}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xl font-medium">{tab.label}</span>
                </button>
                <div className="flex space-x-2 pb-3">
                  {["brandSlug"].includes(tab.key) ? (
                    <div className="grid grid-cols-3 gap-3 cursor-pointer">
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
                          className={cn("w-28 cursor-pointer flex justify-start text-left text-sm p-2 bg-[#E7F4F8] border-2 border-[#BBDEE9] hover:bg-[#0888B1] hover:border-2 hover:border-[#0888B1]", filters?.[tab.key] === item.value ? "bg-[#0888B1] border-2 border-[#0888B1]" : "")}
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

      {/* Mobile Bar */}
      <div className="lg:hidden fixed bottom-0 right-0 z-10 w-full bg-white flex">
        <Button onClick={() => setIsFilterOpen(true)} variant="outline" className="w-1/2 rounded-none">
          Filters
        </Button>
        <Select
          onValueChange={(value) => onChangeFilter({ sort_by: value })}
          defaultValue={filters?.sort_by}
        >
          <SelectTrigger className="w-1/2 rounded-none border-l">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LTH">Price: Low to High</SelectItem>
            <SelectItem value="HTL">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}


