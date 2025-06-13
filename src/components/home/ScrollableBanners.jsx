'use client';

import { useEffect, useRef } from 'react';
import banner1 from '@/assets/banners/banner1.png';
import banner2 from '@/assets/banners/banner2.png';
import banner3 from '@/assets/banners/banner3.png';
import banner4 from '@/assets/banners/banner4.png';

const ScrollableBanners = () => {
  const scrollRef = useRef(null);
  const bannerImages = [banner1, banner2, banner3, banner4];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let animationFrameId;

    const scrollStep = () => {
      scrollAmount += 0.8; // Adjust speed
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0; // Reset for infinite loop
      }
      container.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-hidden whitespace-nowrap"
    >
      <div className="flex gap-4 w-max">
        {[...bannerImages, ...bannerImages].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Banner ${index + 1}`}
            className="h-[120px] md:h-[250px] rounded-xl flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollableBanners;
