"use client";

import React, { useEffect, useRef } from "react";
import promo1 from "@/assets/promos/banner1.png";
import promo2 from "@/assets/promos/banner2.png";
import promo3 from "@/assets/promos/banner3.png";
import CustomImage from "@/components/images/CustomImage";
import AnimatedImage from "../images/AnimatedImage";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/app/apis/getBrands";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";

const promoImages = [promo1, promo2, promo3];

const Brands = () => {
  const scrollRef = useRef(null);
  const isHovered = useRef(false);
  const animationRef = useRef();

  const {
    data: brands = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: (res) => res?.data?.data || [],
  });

  const brandImages =
    brands.length > 0
      ? brands
      : promoImages.map((img, i) => ({
          logo: img,
          name: `Promo ${i + 1}`,
          _id: `promo-${i}`,
        }));
  const images = [...brandImages, ...brandImages];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let scrollStep = 1;
    let trackWidth = 0;

    const onEnter = () => {
      isHovered.current = true;
    };
    const onLeave = () => {
      isHovered.current = false;
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    function updateTrackWidth() {
      const track = el.querySelector(".promotions-banner-track");
      if (track) {
        trackWidth = track.scrollWidth / 2;
      }
    }
    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);

    function autoScroll() {
      if (!isHovered.current) {
        if (el.scrollLeft >= trackWidth) {
          el.scrollLeft = el.scrollLeft - trackWidth;
        } else {
          el.scrollLeft += scrollStep;
        }
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    }
    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", updateTrackWidth);
    };
  }, [images]);

  return (
    <div className="w-full px-0 md:px-4 py-8 md:py-4">
      {isLoading ? (
        <PrimaryLoader />
      ) : isError || !brands.length ? (
        <PrimaryEmptyState title="No brands found!" />
      ) : (
        <div
          className="overflow-x-auto hide-scrollbar"
          ref={scrollRef}
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="flex gap-12 w-max promotions-banner-track">
            {images.map((brand, index) => (
              <div
                key={brand._id ? `${brand._id}-${index}` : index}
                className="flex-shrink-0 relative rounded-xl overflow-hidden flex flex-col items-center justify-center w-40 h-40 md:w-auto md:h-auto"
                style={{ aspectRatio: window?.innerWidth >= 768 ? "1.8/1" : "1/1" }}
              >
                <AnimatedImage
                  src={brand.logo}
                  alt={brand.name}
                  className="object-contain w-full h-[45px] md:h-[80px]"
                  priority={index === 0}
                />
                <span className="block text-center text-xs md:text-base font-semibold mt-1 md:mt-2 text-[#333] truncate w-full px-2">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
