"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/app/apis/getBrands";
import { getBreeds } from "@/app/apis/getBreeds";
import { Drawer } from "./CustomDrawer";

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

export default function FilterDrawer({ 
  open, 
  onClose, 
  filters, 
  onChangeFilter, 
  collections = [] 
}) {
  const [tempFilters, setTempFilters] = useState({});
  const [selectedBrand, setSelectedBrand] = useState(null);

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
    onClose();
  };

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

  return (
    <Drawer
      open={open}
      onClose={onClose}
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
      </div>

      {/* Apply Button */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <Button 
          onClick={applyFilters}
          className="w-full h-12 text-lg font-semibold"
        >
          Apply Filters
        </Button>
      </div>
    </Drawer>
  );
}
