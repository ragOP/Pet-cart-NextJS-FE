"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperCarousel({
  children,
  className = "",
  itemClassName = "",
  contentClassName = "",
  height = 'auto',
  width = '100%',
  showArrows = true,
  showPagination = false,
  autoplay = false,
  loop = false,
  slidesPerView = "auto",
  spaceBetween = 16,
  breakpoints = {},
  ...props
}) {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {showArrows && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 transition"
          >
            <ChevronLeft className="w-12 h-12 text-[#0888B1] flex-shrink-0" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 transition"
          >
            <ChevronRight className="w-12 h-12 text-[#0888B1] flex-shrink-0" />
          </button>
        </>
      )}
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        pagination={showPagination ? { clickable: true } : false}
        navigation={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={breakpoints}
        className={`${contentClassName}`}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className={`${itemClassName} h-full`}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
