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
import { getCoupons } from '@/app/apis/getCoupons';
import { useQuery } from '@tanstack/react-query';

const CouponSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coupons'],
    queryFn: () => getCoupons(),
    select: (res) => res?.data?.data || [],
  });

  const coupons = [coupon1, coupon2, coupon3]

  console.log(data);

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
        <CarouselItem key={3} className="flex flex-col items-center">
          <button
            type="button"
            aria-label={`Activate coupon ${3 + 1}`}
            className=" flex uppercase w-full h-40 md:h-56 outline-none focus:outline-none bg-transparent rounded-2xl transition-all duration-200 hover:scale-105 focus:scale-105 cursor-pointer"
            onClick={() => {
              // Placeholder: replace with copy code, open modal, or show toast
              console.log(`Coupon ${3 + 1} clicked`);
            }}
          >
            <CustomImage
              src="/coupon-bg.svg"
              alt={`Coupon ${3 + 1}`}
              className="absolute w-full h-40 md:h-36 object-contain rounded-2xl"
            // width={130}
            // height={55}
            />

            {/* <div className="flex flex-col items-center justify-center space-y-2 w-4/6">
              <div className="flex flex-col items-center justify-center text-[#684A00] text-[33px] tracking-0 font-gotham-rounded leading-[100%]">
                <span>DISCOUNT</span>
                <span>COUPON</span>
              </div>
              <div className="flex items-center justify-center gap-2 font-bold text-xs text-[#181818] tracking-0 leading-[100%]">
                <span>VALID TILL JULY 12<sup>th</sup></span>
                <img src={pawLogo} alt="Paw Logo" className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1 flex-col items-center justify-evenly">
              <span>VOUCHER</span>
              <div className="flex flex-col items-center gap-2">
                <span>70%</span>
                <span>DISCOUNT</span>
              </div>
              <span>APPLY</span>
            </div> */}
          </button>
        </CarouselItem>
        {coupons.map((img, index) => (
          <CarouselItem key={index} className="flex flex-col items-center">
            <button
              type="button"
              aria-label={`Activate coupon ${index + 1}`}
              className="w-full h-40 md:h-56 outline-none focus:outline-none bg-transparent rounded-2xl transition-all duration-200 hover:scale-105 focus:scale-105 cursor-pointer"
              onClick={() => {
                // Placeholder: replace with copy code, open modal, or show toast
                console.log(`Coupon ${index + 1} clicked`);
              }}
            >
              <CustomImage
                src={img}
                alt={`Coupon ${index + 1}`}
                className="w-full h-40 md:h-36 object-contain rounded-2xl bg-white"
              // width={130}
              // height={55}
              />
            </button>
          </CarouselItem>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default CouponSection
