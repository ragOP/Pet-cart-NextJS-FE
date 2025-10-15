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
import { useRouter } from "next/navigation";

const BestSellers = () =>{
  const [api, setApi] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const params = {
    page: 1,
    per_page: 20,
    // isBestSeller: true,
    max_price: 599,
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestsellers", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data?.data || [],
  });

  const router = useRouter();

  // Update scroll states when API changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollLeft(api.canScrollPrev());
      setCanScrollRight(api.canScrollNext());
    };

    // Set initial state
    onSelect();

    // Listen for changes
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const onNavigateToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="w-full md:px-4 py-3 bg-white lg:px-[4%] px-[4%] -mt-4">
      {/* Header */}
      <div className="font-bold mb-4 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle flex flex-row gap-2 items-center">
        <CustomImage
          src={paswIcon}
          alt="Paw Logo"
          className="inline-block mr-0 lg:h-7 w-auto h-4 lg:mb-2 mb-0"
        />
        <span className="space-x-2">
          <span className="text-[#F59A11] text-xl md:text-3xl font-bold">Bestsellers</span>
          <span className="text-[#0888B1] text-xl md:text-3xl font-bold">Under ₹599</span>
        </span>
      </div>

      {/* Carousel */}
      <CustomCarousel
        className="hide-scrollbar min-h-[260px]"
        contentClassName=""
        itemClassName="flex flex-col items-center"
        showArrows={true}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          containScroll: "trimSnaps"
        }}
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
              className="basis-auto min-w-0"
            >
              <BestSellerProduct
                product={{
                  ...product,
                  starIcon,
                  vegIcon,
                  offIcon,
                  label: product.title || product.name,
                }}
                className="min-w-[20rem] max-w-[20rem] min-h-full cursor-pointer"
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
}

export default BestSellers;
