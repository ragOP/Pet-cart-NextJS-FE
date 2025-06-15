"use client";

import React, { useEffect, useState } from "react";
import pawLogo from "@/assets/essential/paws-logo.png";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import ProductItem from "@/components/product/ProductItem";

// Import product images from your assets
import prod1 from "@/assets/essential/prod1.png";
import prod2 from "@/assets/essential/prod2.png";
import prod3 from "@/assets/essential/prod3.png";
import prod4 from "@/assets/essential/prod4.png";
import prod5 from "@/assets/essential/prod5.png";
import prod6 from "@/assets/essential/prod6.png";
import prod7 from "@/assets/essential/prod7.png";
import prod8 from "@/assets/essential/prod8.png";
import { CarouselItem } from "../ui/carousel";

import { fetchProducts } from "@/helpers/home";
import { Skeleton } from "../ui/skeleton";

function Essential() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);  

  const paramInitialState = {
    page: 1,
    per_page: 50,
    search: "",
  };  

  useEffect(() => {
    setLoading(true);
     fetchProducts({ params: paramInitialState }).then((data) => {
      setProducts(data?.data);
      setLoading(false);
    });
  }, []);
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
        {loading ? (
          <>
            <Skeleton className="w-full h-[300px]" />
            <Skeleton className="w-full h-[300px]" />
            <Skeleton className="w-full h-[300px]" />
          </>
        ) : (
          <>
            {products.map((item) => (
              <CarouselItem
                key={item._id}
                className="flex flex-col items-center"
              >
                <ProductItem
                  image={item.images[0]}
                  alt={item.title}
                  label={item.title}
                />
              </CarouselItem>
            ))}
          </>
        )}
      </CustomCarousel>
    </div>
  );
}

export default Essential;
