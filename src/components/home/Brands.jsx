"use client";

import React, { useEffect, useRef } from "react";
import promo1 from "@/assets/promos/banner1.png";
import promo2 from "@/assets/promos/banner2.png";
import promo3 from "@/assets/promos/banner3.png";
import CustomImage from "@/components/images/CustomImage";
import AnimatedImage from "../images/AnimatedImage";

const promoImages = [promo1, promo2, promo3];

const Brands = () => {
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
      const track = el.querySelector(".promotions-banner-track");
      if (track) {
        trackWidth = track.scrollWidth / 2; // since we duplicate images
      }
    }
    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);

    // Start at the end for RTL scroll
    el.scrollLeft = el.scrollWidth;

    function autoScroll() {
      if (!isHovered.current) {
        if (el.scrollLeft <= 0) {
          el.scrollLeft = trackWidth;
        } else {
          el.scrollLeft -= scrollStep;
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
  const images = [...promoImages, ...promoImages];

  return (
    <div className="w-full px-0 md:px-4 py-4 md:py-6">
      <div
        className="overflow-x-auto hide-scrollbar"
        ref={scrollRef}
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="flex gap-4 w-max promotions-banner-track">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative rounded-xl overflow-hidden w-[90vw] md:w-[32vw] max-w-xl"
              style={{ aspectRatio: "3/1" }}
            >
              <AnimatedImage
                src={img}
                alt={`Promo ${(index % promoImages.length) + 1}`}
                className="object-cover w-full h-full"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
