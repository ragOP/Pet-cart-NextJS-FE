"use client";

import React from "react";
import applodLogo from "@/assets/applod/applod-brand.png";
import CustomImage from "@/components/images/CustomImage";
import banner1 from "@/assets/banners/banner1.png";
import banner2 from "@/assets/banners/banner2.png";
import banner3 from "@/assets/banners/banner3.png";
import banner4 from "@/assets/banners/banner4.png";
import AnimatedImage from "../images/AnimatedImage";

const Applod = () => {
  const bannerImages = [banner1, banner2, banner3, banner4];

  return (
    <>
      {/* Applod Logo */}
      <div className="w-full h-auto min-h-[150px] max-w-screen rounded-lg overflow-hidden p-2 pr-4">
        <AnimatedImage src={applodLogo} alt="Applod Logo" />
      </div>

      {/* Scrollable Banners with hidden scrollbar */}
      <div className="w-full overflow-x-auto px-2 hide-scrollbar">
        <div className="flex gap-4 w-max">
          {bannerImages.map((img, index) => (
            <CustomImage
              key={index}
              src={img}
              alt={`Banner ${index + 1}`}
              className="h-[120px] md:h-[250px] rounded-xl flex-shrink-0"
              width={400}
              height={120}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Applod;
