"use client";

import React from "react";
import discountLogo from "@/assets/treats/discount.png";
import CustomImage from "@/components/images/CustomImage";
import { useQuery } from "@tanstack/react-query";
import { getAdBanner } from "@/app/apis/getAdBanner";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import TreatProductCard from "@/components/product/TreatProductCard";
import { motion } from "framer-motion";
import { useState } from "react";

const TreatSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ad-banner"],
    queryFn: getAdBanner,
    select: (res) => res?.data?.data || {},
  });

  const products = data?.products || [];
  const title = data?.title || "JUST TREATS. BAKED TO BE REAL.";
  const description =
    data?.description || "more protein, more crunch, more taste";
  const link = data?.link || "#";

  return (
    <div className="bg-[#FFF2809E] p-2 md:py-6 md:pl-8 rounded-2xl mt-6 flex flex-col md:flex-row justify-between gap-6 m-2">
      {/* Left: Text & CTA */}
      <div className="flex-1 max-w-md  justify-between">
        <h2 className="text-[40px] font-bold text-[#814E00] leading-tight font-holtwood uppercase">
          {title}
        </h2>
        <p className="text-[25px] text-black mt-2">{description}</p>
        <div className="relative mt-12 inline-block group">
      {/* Cat GIF */}
      <motion.img
        src="/animation.gif"
        alt="Cat Animation"
        className="absolute right-2 -top-[8rem] w-24 h-32 z-0 pointer-events-none"
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      />

      {/* Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex items-center justify-center bg-[#F59A11] text-white text-lg font-semibold px-6 py-2 rounded-xl md:w-45 md:h-15 cursor-pointer hover:shadow-lg focus:shadow-lg outline-none text-center"
        tabIndex={0}
        aria-label="Shop now"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>Shop now</span>
      </a>
    </div>

      </div>

      {/* Right: Product Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
        {isLoading ? (
          <PrimaryLoader />
        ) : isError || !products.length ? (
          <PrimaryEmptyState title="No treats found!" />
        ) : (
          products.map((item) => (
            <TreatProductCard
              key={item._id}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TreatSection;
