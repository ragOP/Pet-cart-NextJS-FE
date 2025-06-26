"use client";

import React from "react";
import CustomImage from "@/components/images/CustomImage";
import pawLogo from "@/assets/essential/paws-logo.png"; // optional
import { useQuery } from "@tanstack/react-query";
import { getCatLifeBanners } from "@/app/apis/getCatLifeBanners";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import CatBannerCard from "../product/CatBannerCard";
import Link from "next/link";

const CatsLife = () => {
  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ["cat-life-banners"],
    queryFn: getCatLifeBanners,
    select: (res) => res?.data?.data || [],
  });
  

  return (
    <div className="w-full px-2 md:px-4 py-6">
      {/* Title */}
      <div className="font-bold mb-4 items-center md:items-start font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle flex flex-row gap-2">
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

      {/* Loader, Empty State, or Cards */}
      {isLoading ? (
        <PrimaryLoader />
      ) : !items.length || isError ? (
        <PrimaryEmptyState title="No cat life banners found!" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((item) => {
            const isInternal = item.link && item.link.startsWith("/");
            const isExternal = item.link && item.link.startsWith("http");
            const card = (
              <CatBannerCard
                key={item._id}
                image={item.image}
                title={item.title}
              />
            );
            const shopNow = (
              <span className="text-sm text-[#181818] mt-1 transition-colors cursor-pointer hover:text-[#F59A11] focus:text-[#F59A11] hover:underline focus:underline outline-none block font-medium">
                Shop Now &gt;
              </span>
            );
            if (isInternal) {
              return (
                <Link href={item.link} key={item._id} className="focus:outline-none">
                  <div className="flex flex-col h-full">{card}{shopNow}</div>
                </Link>
              );
            } else if (isExternal) {
              return (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item._id}
                  className="focus:outline-none"
                >
                  <div className="flex flex-col h-full">{card}{shopNow}</div>
                </a>
              );
            } else {
              return <div key={item._id}>{card}</div>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default CatsLife;
