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

export default function CustomCarousel({
  children,
  className = "",
  itemClassName = "",
  contentClassName = "",
  height = 'auto',
  width = '100%',
  showArrows = true,
  ...props
}) {
  return (
    <ShadCarousel
      className={`relative ${className}`}
      style={{ width, height }}
      {...props}
    >
      {showArrows && (
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-2 hover:bg-white transition">
          <ChevronLeft className="w-8 h-8 text-[#0888B1]" />
        </CarouselPrevious>
      )}
      <CarouselContent className={`flex gap-4 px-8 ${contentClassName}`} style={{ height }}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { className: `!basis-auto ${itemClassName} ${child.props.className || ''}` })
            : child
        )}
      </CarouselContent>
      {showArrows && (
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-2 hover:bg-white transition">
          <ChevronRight className="w-8 h-8 text-[#0888B1]" />
        </CarouselNext>
      )}
    </ShadCarousel>
  );
}
