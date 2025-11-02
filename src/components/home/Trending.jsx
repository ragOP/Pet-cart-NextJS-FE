"use client";

import React, { useEffect, useState } from "react";
import pawLogo from "@/assets/essential/paws-logo.png";
import trendingSnacks from "@/assets/trending/snacks.png";
import trendingCatToys from "@/assets/trending/cat-toys.png";
import trendingDogToys from "@/assets/trending/dog-toys.png";
import trendingBedding from "@/assets/trending/bedding.png";
import trendingDogTreats from "@/assets/trending/dog-treats.png";
import trendingCare from "@/assets/trending/care.png";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "../carousel/CustomCarousel";
import { CarouselItem } from "../ui/carousel";
import ProductItem from "@/components/product/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { useRouter } from "next/navigation";

const trendingItems = [
  { id: 1, image: trendingSnacks, label: "Snacks & Treat" },
  { id: 2, image: trendingCatToys, label: "Cat Toys" },
  { id: 3, image: trendingDogToys, label: "Dog Toys" },
  { id: 4, image: trendingBedding, label: "Bedding" },
  { id: 5, image: trendingDogTreats, label: "Dog Treats" },
  { id: 6, image: trendingCare, label: "Care Products" },
  { id: 7, image: trendingCare, label: "Care Products" },
  { id: 8, image: trendingCare, label: "Care Products" },
];

// Trending item card component
const TrendingItemCard = ({ item }) => (
  <div className="flex flex-col items-center group transition-all duration-200">
    <CustomImage
      src={item.images[0]}
      alt={item.title}
      className="w-36 h-36 object-contain transition-transform duration-200 group-hover:scale-110 group-focus:scale-110"
      width={144}
      height={144}
    />
    <p
      className="text-sm mt-2 font-medium text-[#181818] text-center transition-all duration-200 cursor-pointer hover:text-[#F59A11] focus:text-[#F59A11] hover:underline focus:underline outline-none group-hover:scale-105 group-focus:scale-105"
      tabIndex={0}
      onClick={() => {
        console.log("Trending item clicked:", item.title);
      }}
      aria-label={`Shop ${item.title}`}
    >
      {String(item.title).slice(0, 20)}
    </p>
  </div>
);

function Trending() {
  // Fetch trending products (isAddToCart)
  const params = { page: 1, per_page: 10, isAddToCart: true };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trendingProducts", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data?.data || [],
  });

  const router = useRouter();

  const onNavigateToProduct = (product) => {
    router.push(`/product/${product?.slug}`);
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
          <span className="text-[#F59A11]">Trending</span>
          <span className="text-[#0888B1]">Add-To-Carts</span>
        </span>
      </div>

      {/* Carousel for trending items */}
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
                className="w-50 cursor-pointer"
                onClick={() => onNavigateToProduct(item)}
              />
            </CarouselItem>
          ))}
        {data && data.length === 0 && !isLoading && (
          <div className="flex justify-center w-full">
            <PrimaryEmptyState title="No trending products found." />
          </div>
        )}
      </CustomCarousel>
    </div>
  );
}

export default Trending;
