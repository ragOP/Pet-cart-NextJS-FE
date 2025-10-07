"use client";

import * as React from "react";
import {
  Carousel as ShadCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomCarousel = React.forwardRef(function CustomCarousel({
  children,
  className = "",
  itemClassName = "",
  contentClassName = "",
  height = 'auto',
  width = '100%',
  showArrows = true,
  canScrollLeft = true,
  canScrollRight = true,
  setApi,
  opts = {},
  ...props
}, ref) {
  return (
    <ShadCarousel
      ref={ref}
      className={`relative ${className}`}
      style={{ width, height }}
      setApi={setApi}
      opts={opts}
      {...props}
    >
      {showArrows && (
        <CarouselPrevious 
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 transition ${
            canScrollLeft 
              ? 'hover:bg-gray-50 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-12 h-12 text-[#0888B1] flex-shrink-0" />
        </CarouselPrevious>
      )}
      <CarouselContent className={`flex ${contentClassName}`} style={{ height }}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { className: `${itemClassName} ${child.props.className || ''}` })
            : child
        )}
      </CarouselContent>
      {showArrows && (
        <CarouselNext 
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 transition ${
            canScrollRight 
              ? 'hover:bg-gray-50 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-12 h-12 text-[#0888B1] flex-shrink-0" />
        </CarouselNext>
      )}
    </ShadCarousel>
  );
});

export default CustomCarousel;
