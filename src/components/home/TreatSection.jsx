"use client";

import React from "react";
import discountLogo from "@/assets/treats/discount.png";
import CustomImage from "@/components/images/CustomImage";
import { useQuery } from "@tanstack/react-query";
import { getAdBanner } from "@/app/apis/getAdBanner";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import TreatProductCard from "@/components/product/TreatProductCard";

const TreatSection = () => {
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
    <div className="bg-[#FFF2809E] p-4 md:py-6 md:pl-8 rounded-2xl mt-6 flex flex-col md:flex-row justify-between gap-6 m-4">
      {/* Left: Text & CTA */}
      <div className="flex-1 max-w-md  justify-between">
        <h2 className="text-[40px] font-bold text-[#814E00] leading-tight font-holtwood uppercase">
          {title}
        </h2>
        <p className="text-[25px] text-black mt-2">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className=" flex items-center justify-center bg-[#F59A11] text-white text-lg font-semibold mt-12 px-6 py-2 rounded-xl md:w-45 md:h-15 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg outline-none text-center"
          tabIndex={0}
          aria-label="Shop now"
        >
          Shop now
        </a>
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
