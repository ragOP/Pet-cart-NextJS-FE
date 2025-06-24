"use client";

import React, { useEffect, useState } from "react";
import offIcon from "@/assets/bestseller/off.png";
import vegIcon from "@/assets/bestseller/veg-icon.png";
import paswIcon from "@/assets/bestseller/paws.png";
import starIcon from "@/assets/bestseller/Vector.png";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import "@/styles/hide-scrollbar.css";
import BestSellerProduct from "@/components/product/BestSellerProduct";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { CarouselItem } from "../ui/carousel";

const BestSellers = () =>{
  const params = {
    page: 1,
    per_page: 10,
    // isBestSeller: true,
    max_price: 599,
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestsellers", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data?.data || [],
  });

  return (
    <div className="w-full px-4 py-8 bg-white">
      {/* Header */}
      <div className="font-bold mb-4 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle flex flex-row gap-2">
        <CustomImage
          src={paswIcon}
          alt="Paw Logo"
          className="inline-block mr-0 h-6"
          width={50}
          height={60}
        />
        <span className="space-x-2">
          <span className="text-[#F59A11]">Bestsellers</span>
          <span className="text-[#0888B1]">Under ₹599</span>
        </span>
      </div>

      {/* Carousel */}
      <CustomCarousel
        className="hide-scrollbar min-h-[260px] flex items-center justify-center"
        contentClassName="gap-4 flex items-center justify-center min-h-[220px]"
        itemClassName="min-w-[250px] max-w-[250px] flex flex-col items-center justify-center"
        showArrows={true}
      >
        {isLoading && (
          <div className="flex flex-1 justify-center items-center w-full h-full min-h-[220px]">
            <PrimaryLoader />
          </div>
        )}
        {isError && (
          <div className="flex flex-1 justify-center items-center w-full h-full min-h-[220px]">
            <PrimaryEmptyState title="Failed to load products." />
          </div>
        )}
        {data &&
          data.length > 0 &&
          data.map((product) => (
            <CarouselItem
              key={product._id || product.id}
              className="flex flex-col items-center justify-center"
            >
              <BestSellerProduct
                product={{
                  ...product,
                  starIcon,
                  vegIcon,
                  offIcon,
                  label: product.title || product.name,
                }}
                className="w-60"
              />
            </CarouselItem>
          ))}
        {data && data.length === 0 && !isLoading && (
          <div className="flex flex-1 w-full justify-center items-center">
            <PrimaryEmptyState title="No bestsellers found." />
          </div>
        )}
      </CustomCarousel>
    </div>
  );
}

export default BestSellers;
