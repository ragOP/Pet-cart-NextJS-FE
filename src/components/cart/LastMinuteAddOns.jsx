"use client";

import React, { useEffect, useState } from "react";
import offIcon from "@/assets/bestseller/off.png";
import vegIcon from "@/assets/bestseller/veg-icon.png";
import paswIcon from "@/assets/bestseller/paws.png";
import starIcon from "@/assets/bestseller/Vector.png";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import BestSellerProduct from "@/components/product/BestSellerProduct";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { CarouselItem } from "../ui/carousel";
import "@/styles/hide-scrollbar.css";
import { useRouter } from "next/navigation";

const LastMinuteAddOns = () => {
  const router = useRouter();
  const params = {
    page: 1,
    per_page: 10,
    handPicked: true,
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["last_minute_add_ons", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data?.data || [],
  });

  const onNavigateToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="w-full px-2 md:px-8 py-8 bg-white">
      {/* Header */}
      <div className=" mb-4 align-middle flex flex-row gap-2">
        <CustomImage
          src={paswIcon}
          alt="Paw Logo"
          className="inline-block mr-0 h-6"
          width={50}
          height={60}
        />
        <span className="text-[#0888B1] font-bold text-[28px] leading-[28.5px] tracking-[0.57px] ">
          Last Minute Add-Ons
        </span>
      </div>

      {/* Carousel */}
      <CustomCarousel
        className="hide-scrollbar min-h-[320px] flex items-center justify-center"
        contentClassName="gap-4 flex items-center justify-center min-h-[280px]"
        itemClassName="min-w-fit-content max-w-fit-content flex flex-col items-center justify-center"
        showArrows={true}
      >
        {isLoading && (
          <div className="flex flex-1 justify-center items-center w-full h-full min-h-[280px]">
            <PrimaryLoader />
          </div>
        )}
        {isError && (
          <div className="flex flex-1 justify-center items-center w-full h-full min-h-[280px]">
            <PrimaryEmptyState title="Failed to load products." />
          </div>
        )}
        {data &&
          data.length > 0 &&
          data.map((product) => (
            <CarouselItem
              key={product._id || product.id}
              className="flex flex-col items-center justify-center px-2"
            >
              <BestSellerProduct
                product={{
                  ...product,
                  starIcon,
                  vegIcon,
                  offIcon,
                  label: product.title || product.name,
                }}
                className="w-72 h-auto cursor-pointer"
                onClick={() => onNavigateToProduct(product._id)}
              />
            </CarouselItem>
          ))}
        {data && data.length === 0 && !isLoading && (
          <div className="flex flex-1 w-full justify-center items-center">
            <PrimaryEmptyState title="No add-on products found." />
          </div>
        )}
      </CustomCarousel>
    </div>
  );
};

export default LastMinuteAddOns;
