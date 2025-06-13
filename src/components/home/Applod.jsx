"use client";

import React, { useEffect, useRef } from "react";
import applodLogo from "@/assets/applod/applod-brand.png";
import CustomImage from "@/components/images/CustomImage";
import banner1 from "@/assets/banners/banner1.png";
import banner2 from "@/assets/banners/banner2.png";
import banner3 from "@/assets/banners/banner3.png";
import banner4 from "@/assets/banners/banner4.png";
import AnimatedImage from "../images/AnimatedImage";

const Applod = () => {
  const bannerImages = [banner1, banner2, banner3, banner4];
  const scrollRef = useRef(null);
  const isHovered = useRef(false);
  const animationRef = useRef();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let scrollStep = 1;
    let trackWidth = 0;

    // Set up hover listeners
    const onEnter = () => {
      isHovered.current = true;
    };
    const onLeave = () => {
      isHovered.current = false;
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    // Calculate track width after images load
    function updateTrackWidth() {
      const track = el.querySelector(".applod-banner-track");
      if (track) {
        trackWidth = track.scrollWidth / 2; // since we duplicate images
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
  }, []);

  // Duplicate images for seamless scroll
  const images = [...bannerImages, ...bannerImages];

  return (
    <>
      {/* Applod Logo */}
      <div className="w-full h-auto min-h-[150px] max-w-screen rounded-lg overflow-hidden p-2 pr-4">
        <AnimatedImage src={applodLogo} alt="Applod Logo" />
      </div>

      <div
        className="w-full mt-1 overflow-x-auto px-2 hide-scrollbar"
        ref={scrollRef}
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="flex gap-4 w-max applod-banner-track">
          {images.map((img, index) => (
            <AnimatedImage
              src={img}
              alt={`Promo ${(index % bannerImages.length) + 1}`}
              className="object-cover w-full h-full"
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Applod;
