"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CustomImage from "@/components/images/CustomImage";
import AnimatedImage from "../images/AnimatedImage";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/app/apis/getBanner";
import { getSliders } from "@/app/apis/getSliders";

const Applod = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const webParams = { type: "web" };
  const mobileParams = { type: "app" };

  // Check if mobile on client side with proper initialization
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // API Queries
  const { data: webBannersData } = useQuery({
    queryKey: ["banners", "web"],
    queryFn: () => getBanners({ params: webParams }),
    select: (res) => res?.data?.data || [],
  });

  const { data: mobileBannersData } = useQuery({
    queryKey: ["banners", "mobile"],
    queryFn: () => getBanners({ params: mobileParams }),
    select: (res) => res?.data?.data || [],
  });

  const { data: webSlidersData } = useQuery({
    queryKey: ["sliders", "web"],
    queryFn: () => getSliders({ params: webParams }),
    select: (res) => res?.data?.data || [],
  });

  const { data: mobileSlidersData } = useQuery({
    queryKey: ["sliders", "mobile"],
    queryFn: () => getSliders({ params: mobileParams }),
    select: (res) => res?.data?.data || [],
  });

  // Dynamic data based on screen size - only after client-side hydration
  const currentBanners = isClient ? (isMobile ? mobileBannersData : webBannersData) : webBannersData;
  const currentSliders = isClient ? (isMobile ? mobileSlidersData : webSlidersData) : webSlidersData;
  const bannerImage = currentBanners?.[0]?.image;
  const slidersImages = currentSliders ? [...currentSliders, ...currentSliders] : [];

  // Refs for auto-scroll
  const scrollRef = useRef(null);
  const isHovered = useRef(false);
  const animationRef = useRef();

  // Handle navigation
  const handleNavigation = (link) => {
    if (!link || link === "undefined") return;

    console.log("Navigating to:", link);

    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      console.log("@@@@@@@")
      router.push(link);
    }
  };

  // Auto-scroll logic with improved error handling
  // useEffect(() => {
  //   const el = scrollRef.current;
  //   if (!el || !slidersImages.length || !isClient) return;

  //   let scrollStep = 1;
  //   let trackWidth = 0;
  //   let isAnimationRunning = true;

  //   const handleMouseEnter = () => (isHovered.current = true);
  //   const handleMouseLeave = () => (isHovered.current = false);
  //   const handleTouchStart = () => (isHovered.current = true);
  //   const handleTouchEnd = () => (isHovered.current = false);

  //   // Add event listeners
  //   el.addEventListener("mouseenter", handleMouseEnter);
  //   el.addEventListener("mouseleave", handleMouseLeave);
  //   el.addEventListener("touchstart", handleTouchStart);
  //   el.addEventListener("touchend", handleTouchEnd);

  //   const updateTrackWidth = () => {
  //     try {
  //     const track = el.querySelector(".slider-track");
  //       if (track && track.scrollWidth > 0) {
  //       trackWidth = track.scrollWidth / 2;
  //     }
  //     } catch (error) {
  //       console.warn("Error updating track width:", error);
  //     }
  //   };

  //   // Initial track width calculation with delay to ensure DOM is ready
  //   const initTrackWidth = () => {
  //     setTimeout(updateTrackWidth, 100);
  //   };

  //   initTrackWidth();
  //   window.addEventListener("resize", updateTrackWidth);

  //   const autoScroll = () => {
  //     if (!isAnimationRunning || !el || !isClient) return;

  //     try {
  //       if (!isHovered.current && trackWidth > 0) {
  //       if (el.scrollLeft >= trackWidth) {
  //         el.scrollLeft = el.scrollLeft - trackWidth;
  //       } else {
  //         el.scrollLeft += scrollStep;
  //       }
  //     }
  //     } catch (error) {
  //       console.warn("Error in auto-scroll:", error);
  //       isAnimationRunning = false;
  //       return;
  //     }

  //     if (isAnimationRunning) {
  //     animationRef.current = requestAnimationFrame(autoScroll);
  //     }
  //   };

  //   animationRef.current = requestAnimationFrame(autoScroll);

  //   return () => {
  //     isAnimationRunning = false;
  //     if (animationRef.current) {
  //       cancelAnimationFrame(animationRef.current);
  //       animationRef.current = null;
  //     }
  //     el.removeEventListener("mouseenter", handleMouseEnter);
  //     el.removeEventListener("mouseleave", handleMouseLeave);
  //     el.removeEventListener("touchstart", handleTouchStart);
  //     el.removeEventListener("touchend", handleTouchEnd);
  //     window.removeEventListener("resize", updateTrackWidth);
  //   };
  // }, [slidersImages.length, isClient]);

  const renderSliderItem = (item, index) => {
    if (!item?.image) return null;

    return (
      <div
        key={`slider-${index}`}
        className="basis-[40%] lg:basis-[25%] shrink-0 grow-0 min-w-[40%] lg:min-w-[25%] max-w-[40%] lg:max-w-[25%] px-1"
     >
        <AnimatedImage
          src={item.image}
          alt={`${isMobile ? 'Mobile' : 'Web'} Promo ${index + 1}`}
          className="object-cover w-full h-full cursor-pointer"
          priority={index === 0}
          onClick={() => handleNavigation(item.link)}
        />
      </div>
    );
  };

  return (
    <>
      {/* Dynamic Banner */}
      {bannerImage && (
        <div className="w-full max-w-screen rounded-lg overflow-hidden p-2 pr-4">
          <CustomImage
          key={bannerImage}
            src={bannerImage}
            alt={`${isMobile ? 'Mobile' : 'Web'} Banner`}
            className="w-full object-cover rounded-xl cursor-pointer"
            priority
            onClick={() => handleNavigation(currentBanners[0]?.link)}
          />
        </div>
      )}

      {/* Dynamic Sliders */}
      {slidersImages.length > 0 && (
        <div
          className="w-full mt-1 overflow-x-auto px-2 hide-scrollbar"
          ref={scrollRef}
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="flex flex-nowrap gap-0 w-full slider-track">
            {slidersImages.map(renderSliderItem)}
          </div>
        </div>
      )}
    </>
  );
};

export default Applod;
