"use client";

import React from "react";
import pawLogo from "@/assets/essential/paws-logo.png";
import CustomImage from "@/components/images/CustomImage";
import "@/styles/hide-scrollbar.css";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import { CarouselItem } from "../ui/carousel";
import ProductGradientItem from "@/components/product/ProductGradientItem";

// Import product images from your assets
import prod from "@/assets/essential/prod3.png";


// Static data array
const essentials = [
  { id: 1, image: prod, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 2, image: prod, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 3, image: prod, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 4, image: prod, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 5, image: prod, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 6, image: prod, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 7, image: prod, tag: "BESTSELLER", label: "Chicken Gravy" },
  { id: 8, image: prod, tag: "BESTSELLER", label: "Chicken Gravy" },
];

function NewLaunched() {
  return (
    <div className="w-full px-4 py-6">
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
          <span className="text-[#F59A11]">Newly</span>
          <span className="text-[#0888B1]">Launched</span>
        </span>
      </div>

      {/* Carousel for newly launched products */}
      <CustomCarousel
        className="max-w-full"
        contentClassName=""
        itemClassName="flex flex-col items-center min-w-[20%] sm:min-w-[16.66%] md:min-w-[12.5%] lg:min-w-[10%] xl:min-w-[8.33%]"
      >
        {essentials.map((item) => (
          <CarouselItem key={item.id} className="flex flex-col items-center">
            <div className="relative w-full">
              <ProductGradientItem
                image={item.image}
                alt={item.label}
                label={item.label}
                tag={item.tag === "BESTSELLER" ? undefined : item.tag}
                className="w-full"
                chip={item.tag === "BESTSELLER" ? "BESTSELLER" : undefined}
              />
            </div>
          </CarouselItem>
        ))}
      </CustomCarousel>
    </div>
  );
}

export default NewLaunched;
