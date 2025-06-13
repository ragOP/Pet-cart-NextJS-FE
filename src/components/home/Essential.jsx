"use client";

import React from "react";
import pawLogo from "@/assets/essential/paws-logo.png";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import ProductItem from "@/components/product/ProductItem";

// Import product images from your assets
import prod1 from "@/assets/essential/prod1.png";
import prod2 from "@/assets/essential/prod2.png";
import prod3 from "@/assets/essential/prod3.png";
import prod4 from "@/assets/essential/prod4.png";
import prod5 from "@/assets/essential/prod5.png";
import prod6 from "@/assets/essential/prod6.png";
import prod7 from "@/assets/essential/prod7.png";
import prod8 from "@/assets/essential/prod8.png";
import { CarouselItem } from "../ui/carousel";

// Static data array
const essentials = [
  { id: 1, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 2, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 3, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 4, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 5, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 6, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 7, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 8, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 9, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 10, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 11, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 12, image: prod3, tag: "BESTSELLER", label: "Chicken Gravy" },
];

function Essential() {
  return (
    <div className="w-full px-4 py-6 hidescrollbar">
      {/* Title */}
      <div className="font-bold mb-4 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle flex flex-row gap-2">
        <CustomImage
          src={pawLogo}
          alt="Paw Logo"
          className="inline-block mr-0 h-6"
          width={50}
          height={60}
        />
        <span className="space-x-2">
          <span className="text-[#F59A11]">Everyday</span>
          <span className="text-[#0888B1]">Essentials</span>
        </span>
      </div>

      {/* Carousel for essentials */}
      <CustomCarousel
        className="max-w-full"
        contentClassName=""
        itemClassName="flex flex-col items-center min-w-[20%] sm:min-w-[16.66%] md:min-w-[12.5%] lg:min-w-[10%] xl:min-w-[8.33%]"
      >
        {essentials.map((item) => (
          <CarouselItem key={item.id} className="flex flex-col items-center">
            <ProductItem
              image={item.image}
              alt={item.label}
              label={item.label}
            />
          </CarouselItem>
        ))}
      </CustomCarousel>
    </div>
  );
}

export default Essential;
