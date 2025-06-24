"use client";

import React, { useEffect, useRef } from "react";
import CustomImage from "@/components/images/CustomImage";
import AnimatedImage from "../images/AnimatedImage";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/app/apis/getBanner";
import { getSliders } from "@/app/apis/getSliders";
import Link from "next/link";

const Applod = () => {
  const { data: bannersData } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    select: (res) => res?.data?.data || [],
  });

  const { data: slidersData } = useQuery({
    queryKey: ["sliders"],
    queryFn: getSliders,
    select: (res) => res?.data?.data || [],
  });

  const bannerImages = bannersData?.map((b) => b.image) || [];
  const sliders = slidersData || [];
  const images = [...sliders, ...sliders];
  const scrollRef = useRef(null);
  const isHovered = useRef(false);
  const animationRef = useRef();

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
      const track = el.querySelector(".applod-banner-track");
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
  }, [slidersData]);

  return (
    <>
      <div className="w-full h-auto min-h-[150px] max-w-screen rounded-lg overflow-hidden p-2 pr-4">
        {bannerImages[0] && (
          <CustomImage
            src={bannerImages[0]}
            alt="Applod Logo"
            className="w-full object-cover h-[30vh] rounded-xl"
            width={1200}
            height={300}
            priority
          />
        )}
      </div>

      <div
        className="w-full mt-1 overflow-x-auto px-2 hide-scrollbar"
        ref={scrollRef}
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="flex gap-4 w-max applod-banner-track">
          {images.map((item, index) => {
            const isInternal =
              item.link &&
              item.link !== "undefined" &&
              !item.link.startsWith("http");
            const isExternal = item.link && item.link.startsWith("http");
            const imageEl = (
              <AnimatedImage
                src={item.image}
                key={index}
                alt={`Promo ${index + 1}`}
                className="object-cover w-full h-full"
                priority={index === 0}
              />
            );
            if (isInternal) {
              return (
                <Link href={item.link} key={index}>
                  {imageEl}
                </Link>
              );
            } else if (isExternal) {
              return (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                >
                  {imageEl}
                </a>
              );
            } else {
              return imageEl;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Applod;
