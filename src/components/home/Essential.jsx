"use client";

import React, { useEffect, useState } from "react";
import pawLogo from "@/assets/essential/paws-logo.png";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import ProductItem from "@/components/product/ProductItem";
import { CarouselItem } from "../ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";

const Essential = () => {
  const params = { page: 1, per_page: 10, isEverydayEssential: true };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["essentials", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data?.data || [],
  });

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
        {isLoading && (
          <div className="flex justify-center w-full">
            <PrimaryLoader />
          </div>
        )}
        {isError && (
          <div className="flex justify-center w-full">
            <PrimaryEmptyState title="Failed to load products." />
          </div>
        )}
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <CarouselItem key={item._id} className="flex flex-col items-center">
              <ProductItem
                image={item.images?.[0]}
                alt={item.title}
                label={item.title}
                className="w-50"
              />
            </CarouselItem>
          ))}
        {data && data.length === 0 && !isLoading && (
          <div className="flex justify-center w-full">
            <PrimaryEmptyState title="No essentials found." />
          </div>
        )}
      </CustomCarousel>
    </div>
  );
};

export default Essential;
