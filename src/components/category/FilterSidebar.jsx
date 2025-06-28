import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const promoImages = [
  "/ad-banner.png",
  "/ad-banner.png",
  "/ad-banner.png",
  "/ad-banner.png",
];

export default function FilterSidebar({ subCategories, onChangeFilter }) {
  return (
    <aside className="w-[240px] p-2 space-y-4 hidden lg:block">
      {/* Filter Buttons */}
      <div className="rounded-2xl border border-[#6A6868]">
        {subCategories?.map((subCategory, index) => (
          <button
            key={index}
            onClick={() => onChangeFilter({ subCategorySlug: subCategory.slug })}
            className={cn(
              `flex items-center w-full gap-3 p-4 bg-white border-b text-sm font-medium hover:bg-gray-100 ${index === 0 ? "rounded-t-2xl" : ""} ${index === subCategories.length - 1 ? "rounded-b-2xl" : ""}`
             
            )}
          >
            <Image
              src={subCategory.image}
              alt={subCategory.name}
              width={20}
              height={20}
              className="shrink-0"
            />
            {subCategory.name}
          </button>
        ))}
      </div>

      {/* Promotional Banners */}
      {/* <div className="space-y-4 pt-2">
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
      </div> */}
    </aside>
  );
}
