"use client";

import React from "react";
import CustomImage from "@/components/images/CustomImage";

// Import your cat life images
import cat1 from "@/assets/catslife/cat1.png";
import cat2 from "@/assets/catslife/cat2.png";
import cat3 from "@/assets/catslife/cat3.png";
import cat4 from "@/assets/catslife/cat4.png";
import pawLogo from "@/assets/essential/paws-logo.png"; // optional
import AnimatedImage from "../images/AnimatedImage";

const items = [
  { id: 1, image: cat1, label: "Chicken Gravy" },
  { id: 2, image: cat2, label: "Chicken Gravy" },
  { id: 3, image: cat3, label: "Chicken Gravy" },
  { id: 4, image: cat4, label: "Chicken Gravy" },
];

const CatsLife = () => {
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
        <span>
          <span className="text-[#F59A11]">A Day in Your </span>
          <span className="text-[#0888B1]">Cat's Life...</span>
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-start rounded-lg overflow-hidden"
          >
            <AnimatedImage
              src={item.image}
              alt={item.label}
              className="w-full object-cover rounded-lg"
            />
            <div className="mt-2 px-1">
              <p className="text-base font-semibold text-[#181818]">
                {item.label}
              </p>
              <p
                className="text-sm text-[#181818] mt-1 transition-colors cursor-pointer hover:text-[#F59A11] focus:text-[#F59A11] hover:underline focus:underline outline-none"
                tabIndex={0}
                onClick={() => {
                  console.log("Shop Now clicked");
                }}
                aria-label="Shop Now"
              >
                Shop Now &gt;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatsLife;
