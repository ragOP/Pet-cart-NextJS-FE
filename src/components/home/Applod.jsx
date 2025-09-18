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
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isPointerDown = useRef(false);
  const startXRef = useRef(0);
  const deltaXRef = useRef(0);
  const didDragRef = useRef(false);
  const startTimeRef = useRef(0);
  const rafIdRef = useRef(null);
  const pendingPercentRef = useRef(0);

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
  const slidersImages = currentSliders || [];

  // Carousel state
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = isMobile ? 2 : 4;
  const totalPages = Math.max(1, Math.ceil(slidersImages.length / itemsPerPage));

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

  useEffect(() => {
    if (!slidersImages?.length) return;
    setActivePage((prev) => Math.min(prev, totalPages - 1));
  }, [slidersImages?.length]);

  const handlePointerDown = (e) => {
    if (containerRef.current) {
      containerRef.current.setPointerCapture?.(e.pointerId ?? 1);
    }
    isPointerDown.current = true;
    startXRef.current = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    deltaXRef.current = 0;
    didDragRef.current = false;
    startTimeRef.current = performance.now();
    try { window.getSelection?.().removeAllRanges?.(); } catch {}
    e.preventDefault?.();
  };

  const handlePointerMove = (e) => {
    if (!isPointerDown.current || !trackRef.current || !containerRef.current) return;
    const clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    deltaXRef.current = clientX - startXRef.current;
    if (Math.abs(deltaXRef.current) > 5) didDragRef.current = true;
    const containerWidth = containerRef.current.offsetWidth || 1;
    const percent = (deltaXRef.current / containerWidth) * 100;
    pendingPercentRef.current = percent;
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        if (!trackRef.current) return;
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = `translateX(calc(-${activePage * 100}% + ${pendingPercentRef.current}%))`;
      });
    }
    e.preventDefault?.();
  };

  const endDrag = (e) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    const moved = deltaXRef.current;
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const pxThreshold = Math.min(80, containerWidth * 0.12);
    const elapsedMs = Math.max(1, performance.now() - startTimeRef.current);
    const velocity = moved / elapsedMs; // px per ms
    let next = activePage;
    const isFlick = Math.abs(velocity) > 0.6; // fast swipe
    if (moved > pxThreshold || (isFlick && moved > 10)) next = Math.max(0, activePage - 1);
    else if (moved < -pxThreshold || (isFlick && moved < -10)) next = Math.min(totalPages - 1, activePage + 1);
    setActivePage(next);
    if (trackRef.current) {
      trackRef.current.style.transition = '';
      trackRef.current.style.transform = `translateX(-${next * 100}%)`;
    }
    deltaXRef.current = 0;
    pendingPercentRef.current = 0;
    if (containerRef.current && e?.pointerId != null) {
      try { containerRef.current.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  const renderSliderItem = (item, index) => {
    if (!item?.image) return null;

    return (
      <div
        key={`slider-${index}`}
        className="basis-1/2 lg:basis-1/4 shrink-0 grow-0 min-w-1/2 lg:min-w-1/4 max-w-1/2 lg:max-w-1/4 px-1"
      >
        <div className="w-full overflow-hidden rounded-xl aspect-[3/2] lg:aspect-[16/9]">
          <AnimatedImage
            src={item.image}
            alt={`${isMobile ? 'Mobile' : 'Web'} Promo ${index + 1}`}
            className="object-cover w-full h-full cursor-pointer"
            priority={index === 0}
            onClick={() => { if (!didDragRef.current) handleNavigation(item.link); }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Dynamic Banner */}
      {bannerImage && (
        <div className="w-full max-w-screen rounded-lg overflow-hidden p-2 pt-1">
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

      {/* Carousel with dots (manual only), multi-card layout */}
      {slidersImages.length > 0 && (
        <div className="w-full mt-1">
          <div
            className="relative w-full overflow-hidden"
            ref={containerRef}
            style={{ touchAction: 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className="flex flex-nowrap transition-transform duration-500 ease-out select-none cursor-grab active:cursor-grabbing"
              style={{ transform: `translateX(-${activePage * 100}%)` }}
              ref={trackRef}
            >
              {slidersImages.map(renderSliderItem)}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const isActive = activePage === idx;
              return (
                <button
                  key={`dot-${idx}`}
                  aria-label={`Go to page ${idx + 1}`}
                  onClick={() => setActivePage(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    isActive ? 'w-6 bg-black/80' : 'w-2.5 bg-black/30 hover:bg-black/60'
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Applod;
