'use client';

import React from 'react'
import heartLogo from '@/assets/coupon/HEART.png'
import coupon1 from '@/assets/coupon/coupon1.png'
import coupon2 from '@/assets/coupon/coupon2.png'
import coupon3 from '@/assets/coupon/coupon3.png'
import pawLogo from '@/assets/essential/paws-logo.png' // Optional if you want paw icon
import CustomImage from '@/components/images/CustomImage';
import CustomCarousel from '@/components/carousel/CustomCarousel';
import { CarouselItem } from '../ui/carousel';

const CouponSection = () => {
  const coupons = [coupon1, coupon2, coupon3]

  return (
    <div className="w-full px-2 md:px-4 py-6">
      {/* Title */}
      <div className="font-bold mb-4 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle flex flex-row gap-2">
        <CustomImage
          src={pawLogo}
          alt="Paw Logo"
          className="inline-block mr-0 h-6"
          width={50}
          height={60}
        />
        <span>
          <span className="text-[#F59A11]">Coupons You'll </span>
          <span className="text-[#F73518]">Love ❤️</span>
        </span>
      </div>
      {/* Carousel for coupons */}
      <CustomCarousel
        className="max-w-full"
        contentClassName=""
        itemClassName="flex flex-col items-center min-w-[80vw] sm:min-w-[40vw] md:min-w-[30vw] lg:min-w-[20vw] xl:min-w-[15vw]"
      >
        {coupons.map((img, index) => (
          <CarouselItem key={index} className="flex flex-col items-center">
            <button
              type="button"
              aria-label={`Activate coupon ${index + 1}`}
              className="w-full h-40 md:h-56 outline-none focus:outline-none bg-transparent rounded-2xl transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105 hover:ring-2 hover:ring-[#F59A11] focus:shadow-2xl focus:scale-105 focus:ring-2 focus:ring-[#F59A11] cursor-pointer"
              onClick={() => {
                // Placeholder: replace with copy code, open modal, or show toast
                console.log(`Coupon ${index + 1} clicked`);
              }}
            >
              <CustomImage
                src={img}
                alt={`Coupon ${index + 1}`}
                className="w-full h-40 md:h-56 object-contain rounded-2xl bg-white"
                width={400}
                height={160}
              />
            </button>
          </CarouselItem>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default CouponSection
