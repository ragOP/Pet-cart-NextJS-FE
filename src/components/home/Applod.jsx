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
  
  const webParams = { type: "web" };
  const mobileParams = { type: "app" };

  // Check if mobile on client side
  useEffect(() => {
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

  // Dynamic data based on screen size
  const currentBanners = isMobile ? mobileBannersData : webBannersData;
  const currentSliders = isMobile ? mobileSlidersData : webSlidersData;
  const bannerImage = currentBanners?.[0]?.image;
  const slidersImages = [...(currentSliders || []), ...(currentSliders || [])];

  // Refs for auto-scroll
  const scrollRef = useRef(null);
  const isHovered = useRef(false);
  const animationRef = useRef();

  // Handle navigation
  const handleNavigation = (link) => {
    if (!link || link === "undefined") return;
    
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      router.push(link);
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !slidersImages.length) return;

    let scrollStep = 1;
    let trackWidth = 0;

    const handleMouseEnter = () => (isHovered.current = true);
    const handleMouseLeave = () => (isHovered.current = false);
    const handleTouchStart = () => (isHovered.current = true);
    const handleTouchEnd = () => (isHovered.current = false);

    // Add event listeners
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchend", handleTouchEnd);

    const updateTrackWidth = () => {
      const track = el.querySelector(".slider-track");
      if (track) {
        trackWidth = track.scrollWidth / 2;
      }
    };

    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);

    const autoScroll = () => {
      if (!isHovered.current) {
        if (el.scrollLeft >= trackWidth) {
          el.scrollLeft = el.scrollLeft - trackWidth;
        } else {
          el.scrollLeft += scrollStep;
        }
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", updateTrackWidth);
    };
  }, [slidersImages.length]);

  // Render slider item
  const renderSliderItem = (item, index) => {
    const imageEl = (
      <AnimatedImage
        src={item.image}
        key={`slider-${index}`}
        alt={`${isMobile ? 'Mobile' : 'Web'} Promo ${index + 1}`}
        className="object-cover w-full h-full cursor-pointer"
        priority={index === 0}
        onClick={() => handleNavigation(item.link)}
      />
    );

    return imageEl;
  };

  return (
    <>
      {/* Dynamic Banner */}
      {bannerImage && (
        <div className="w-full h-auto min-h-[150px] max-w-screen rounded-lg overflow-hidden p-2 pr-4">
          <CustomImage
            src={bannerImage}
            alt={`${isMobile ? 'Mobile' : 'Web'} Banner`}
            className="w-full object-cover rounded-xl cursor-pointer"
            width={1200}
            height={300}
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
          <div className="flex gap-4 w-max slider-track">
            {slidersImages.map(renderSliderItem)}
          </div>
        </div>
      )}
    </>
  );
};

export default Applod;
