import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

const filterTabs = [
  "Brand",
  "Breed Size",
  "Pet Type",
  "Veg/Nonveg",
  "Product Type",
  "Flavor",
  "Weight",
  "Product T"
];

export default function TopFilterBar() {
  return (
    <div className="flex items-center gap-3 flex-wrap bg-white py-4 border-b ">
      {/* FILTER ICON BUTTON */}
      <Button variant="ghost" className="gap-2 text-black font-semibold">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </Button>

      {/* FILTER TABS */}
      {filterTabs.map((tab, index) => (
        <Button
          key={index}
          variant="ghost"
          className="bg-[#F1F0F0] text-black font-medium hover:bg-gray-200 rounded-md px-4 py-1"
        >
          {tab.toUpperCase()}
        </Button>
      ))}

      {/* SORTING SELECT */}
      <Select>
        <SelectTrigger className="w-[150px] border border-gray-300">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
          <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
          <SelectItem value="popularity">Popularity</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
