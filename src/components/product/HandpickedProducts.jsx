"use client";

import React, { useEffect, useState, useRef } from "react";
import offIcon from "@/assets/bestseller/off.png";
import vegIcon from "@/assets/bestseller/veg-icon.png";
import paswIcon from "@/assets/bestseller/paws.png";
import starIcon from "@/assets/bestseller/Vector.png";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import BestSellerProduct from "@/components/product/BestSellerProduct";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import { getRecommendations } from "@/app/apis/getRecommendations";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { CarouselItem } from "../ui/carousel";
import "@/styles/hide-scrollbar.css";
import { useRouter } from "next/navigation";

const HandPickedProducts = ({ productId = null, type = "related", title = "Handpicked for you" }) => {
  const [api, setApi] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);
  
  const params = {
    page: 1,
    per_page: 10,
    isAddToCart: true,
  };

  // Use recommendations API if productId is provided, otherwise use general products API
  const { data, isLoading, isError } = useQuery({
    queryKey: productId ? ["recommendations", productId, type] : ["hand_picked", params],
    queryFn: () => 
      productId 
        ? getRecommendations({ productId, type })
        : getProducts(params),
    select: (res) => {
      if (productId) {
        // For recommendations API
        return res?.data || [];
      } else {
        // For general products API
        return res?.data?.data || [];
      }
    },
    enabled: productId ? !!productId : true,
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

  // Add two-finger/trackpad scrolling support
  useEffect(() => {
    if (!api || !carouselRef.current) return;

    const carouselElement = carouselRef.current.querySelector('[data-carousel-content]');
    if (!carouselElement) return;

    const handleWheel = (e) => {
      // Check if it's a trackpad scroll (typically has smaller deltaY values and smoother scrolling)
      const isTrackpad = Math.abs(e.deltaY) < 50;
      
      // For trackpad or horizontal scroll, let it scroll naturally
      if (e.deltaX !== 0 || isTrackpad) {
        e.preventDefault();
        
        // Get the scroll container
        const scrollContainer = api.scrollSnapList();
        const currentIndex = api.selectedScrollSnap();
        
        // Determine scroll direction and amount
        const delta = e.deltaX || e.deltaY;
        
        if (Math.abs(delta) > 10) {
          if (delta > 0 && api.canScrollNext()) {
            api.scrollNext();
          } else if (delta < 0 && api.canScrollPrev()) {
            api.scrollPrev();
          }
        }
      }
    };

    carouselElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carouselElement.removeEventListener('wheel', handleWheel);
    };
  }, [api]);

  const onNavigateToProduct = (product) => {
    router.push(`/product/${product?.slug}`);
  };

  return (
    <div ref={carouselRef} className="w-full py-3 bg-white mt-4">
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
        <span className="text-[#0888B1] text-2xl md:text-3xl">{title}</span>
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
                onClick={() => onNavigateToProduct(product)}
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

export default HandPickedProducts;
