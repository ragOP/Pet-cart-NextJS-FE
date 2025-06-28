"use client";

import React, { useEffect, useState } from "react";
import pawLogo from "@/assets/essential/paws-logo.png";
import CustomImage from "@/components/images/CustomImage";
import "@/styles/hide-scrollbar.css";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import { CarouselItem } from "../ui/carousel";
import ProductGradientItem from "@/components/product/ProductGradientItem";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { useRouter } from "next/navigation";

const NewLaunched = () => {
  const params = { page: 1, per_page: 10, newleyLaunced: true };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["newlyLaunched", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data?.data || [],
  });

  const router = useRouter();

  const onNavigateToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="w-full px-2 md:px-4 py-6">
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
        {isLoading && <div className="flex justify-center w-full"><PrimaryLoader /></div>}
        {isError && (
          <div className="flex justify-center w-full"><PrimaryEmptyState title="Failed to load products." /></div>
        )}
        {data && data.length > 0 &&
          data.map((item) => (
            <CarouselItem key={item._id} className="flex flex-col items-center">
              <ProductGradientItem
                image={item.images?.[0]}
                alt={item.title}
                label={item.title}
                tag={item.tag}
                className="max-w-50 cursor-pointer"
                chip={item.isBestSeller ? "BESTSELLER" : undefined}
                onClick={() => onNavigateToProduct(item._id)}
              />
            </CarouselItem>
          ))}
        {data && data.length === 0 && !isLoading && (
          <div className="flex justify-center w-full"><PrimaryEmptyState title="No newly launched products found." /></div>
        )}
      </CustomCarousel>
    </div>
  );
};

export default NewLaunched;
