import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";
import { Filter, X } from "lucide-react";

const promoImages = [
  "/ad-banner.png",
  "/ad-banner.png",
  "/ad-banner.png",
  "/ad-banner.png",
];

export default function FilterSidebar({ subCategories, onChangeFilter }) {
  const [open, setOpen] = useState(false);

  const FilterContent = ({ isMobile = false }) => (
    <div className={cn("space-y-4", isMobile ? "p-4" : "p-2")}>
      {/* Filter Buttons */}
      <div className="rounded-[8px] border border-[#6A6868]">
        {subCategories?.map((subCategory, index) => (
          <button
            key={index}
            onClick={() => {
              onChangeFilter({ subCategorySlug: subCategory.slug });
              if (isMobile) setOpen(false);
            }}
            className={cn(
              `flex items-center w-full gap-3 p-4 bg-white border-b text-sm font-medium hover:bg-gray-100 transition-colors`,
              index === 0 ? "rounded-t-[8px]" : "",
              index === subCategories.length - 1 ? "rounded-b-[8px]" : ""
            )}
          >
            <Image
              src={subCategory.image}
              alt={subCategory.name}
              width={20}
              height={20}
              className="shrink-0"
            />
            <span className="text-start">{subCategory.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-[240px] space-y-4 hidden lg:block">
        <FilterContent />
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white shadow-md">
              <Filter className="h-4 w-4 mr-2" />
              Categories
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-[300px] sm:w-[400px] h-full">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <DrawerTitle>Filter by Category</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto">
              <FilterContent isMobile={true} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
