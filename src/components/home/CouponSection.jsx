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
    <div className="w-full px-4 py-6">
      {/* Title */}
      <h2 className="font-bold mb-4 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle flex items-center gap-2">
        <span className="text-yellow-500">
          <CustomImage src={pawLogo} alt="Paw Logo" className="inline-block mr-1 h-6" width={24} height={24} />
        </span>
        <span className="text-[#F59A11]">Coupons You&apos;ll </span>
        <span className="text-[#F73518]">Love</span>
        <CustomImage src={heartLogo} alt="Heart Logo" className="inline-block ml-2 h-6" width={24} height={24} />
      </h2>
      {/* Carousel for coupons */}
      <CustomCarousel
        className="max-w-full"
        contentClassName=""
        itemClassName="flex flex-col items-center min-w-[80vw] sm:min-w-[40vw] md:min-w-[30vw] lg:min-w-[20vw] xl:min-w-[15vw]"
      >
        {coupons.map((img, index) => (
          <CarouselItem key={index} className="flex flex-col items-center">
            <CustomImage
              src={img}
              alt={`Coupon ${index + 1}`}
              className="w-full h-40 md:h-56 object-contain rounded-2xl shadow-lg bg-white"
              width={400}
              height={160}
            />
          </CarouselItem>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default CouponSection
