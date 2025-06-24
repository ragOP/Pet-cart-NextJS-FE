import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All Dog Food", icon: "/pet-food.png" },
  { label: "Wet Food", icon: "/pet-food.png" },
  { label: "Dry Food", icon: "/pet-food.png" },
  { label: "Grain Free", icon: "/pet-food.png" },
  { label: "Puppy Food", icon: "/pet-food.png" },
  { label: "Hypoallergenic", icon: "/pet-food.png" },
  { label: "Veterinary Food", icon: "/pet-food.png" },
  { label: "Food Toppers", icon: "/pet-food.png" },
  { label: "Chicken Free", icon: "/pet-food.png" },
];

const promoImages = [
  "/ad-banner.png",
  "/ad-banner.png",
  "/ad-banner.png",
  "/ad-banner.png",
];

export default function FilterSidebar() {
  return (
    <aside className="w-[240px] p-2 space-y-4">
      {/* Filter Buttons */}
      <div className="">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={cn(
              "flex items-center w-full gap-3 px-4 py-4  bg-white shadow-sm border text-sm font-medium hover:bg-gray-100"
            )}
          >
            <Image
              src={filter.icon}
              alt={filter.label}
              width={20}
              height={20}
              className="shrink-0"
            />
            {filter.label}
          </button>
        ))}
      </div>

      {/* Promotional Banners */}
      <div className="space-y-4 pt-2">
        {promoImages.map((src, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-md">
            <Image
              src={src}
              alt={`promo-${index}`}
              width={240}
              height={120}
              layout="responsive"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
