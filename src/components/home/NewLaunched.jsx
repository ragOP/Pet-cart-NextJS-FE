"use client";

import React, { useEffect, useState } from "react";
import pawLogo from "@/assets/essential/paws-logo.png";
import CustomImage from "@/components/images/CustomImage";
import "@/styles/hide-scrollbar.css";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import { CarouselItem } from "../ui/carousel";
import ProductGradientItem from "@/components/product/ProductGradientItem";

// Import product images from your assets
import prod from "@/assets/essential/prod3.png";
import { Skeleton } from "../ui/skeleton";
import { fetchProducts } from "@/helpers/home";

function NewLaunched() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const priorDate = new Date();
  priorDate.setDate(today.getDate() - 30); // last 30 days

  const paramInitialState = {
    page: 1,
    per_page: 50,
    search: "",
    start_date: priorDate.toISOString(), // filter from 30 days ago
    end_date: today.toISOString(), // to today
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts({ params: paramInitialState}).then((data) => {
      setProducts(data?.data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="w-full px-4 py-6">
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
        {loading ? (
          <Skeleton className="w-full h-28" />
        ) : (
          products.map((item) => (
            <CarouselItem key={item._id} className="flex flex-col items-center">
              <div className="relative w-full">
                <ProductGradientItem
                  image={item.images[0]}
                  alt={item.title}
                  label={item.title}
                  tag={item.tag === "BESTSELLER" ? undefined : item.tag}
                  className="w-full"
                  chip={item.tag === "BESTSELLER" ? "BESTSELLER" : undefined}
                />
              </div>
            </CarouselItem>
          ))
        )}
      </CustomCarousel>
    </div>
  );
}

export default NewLaunched;
