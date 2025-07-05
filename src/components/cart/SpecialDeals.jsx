"use client";

import React from "react";
import offIcon from "@/assets/bestseller/off.png";
import vegIcon from "@/assets/bestseller/veg-icon.png";
import starIcon from "@/assets/bestseller/Vector.png";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import BestSellerProduct from "@/components/product/BestSellerProduct";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { CarouselItem } from "../ui/carousel";
import { Progress } from "@/components/ui/progress";
import "@/styles/hide-scrollbar.css";
import { useRouter } from "next/navigation";

const SpecialDeals = ({ currentAmount = 597, targetAmount = 1500 }) => {
  const router = useRouter();
  const params = {
    page: 1,
    per_page: 10,
    handPicked: true,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["hand_picked", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data?.data || [],
  });

  const onNavigateToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const remainingAmount = Math.max(0, targetAmount - currentAmount);
  const progressPercent = Math.min(100, (currentAmount / targetAmount) * 100);

  return (
    <div className="w-full px-2 md:px-8 py-8 bg-white">
      {/* Header */}
      <div className="mb-4 flex flex-col pl-2 md:pl-0">
        <span className="text-[#0888B1] font-bold text-xl ">
          Unlock special deals
        </span>
        <span className="text-[#0888B1] text-xl font-normal">
          Almost there! Add ₹{remainingAmount} more
        </span>
      </div>

      {/* Progress Bar */}
      <Progress
        value={progressPercent}
        className="h-2 bg-[#EEAC4933] mb-4"
        indicatorClassName="bg-[#EEAC49]"
      />

      {/* Carousel */}
      <CustomCarousel
        className="hide-scrollbar min-h-[260px] flex items-center justify-center"
        contentClassName="gap-4 flex items-center justify-center min-h-[220px]"
        itemClassName="min-w-fit-content max-w-fit-content flex flex-col items-center justify-center"
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
                className="w-70 cursor-pointer"
                onClick={() => onNavigateToProduct(product._id)}
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
};

export default SpecialDeals;
