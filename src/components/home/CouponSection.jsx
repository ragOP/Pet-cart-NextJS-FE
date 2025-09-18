'use client';

import React from 'react'
import pawLogo from '@/assets/essential/paws-logo.png'
import CustomImage from '@/components/images/CustomImage';
import CustomCarousel from '@/components/carousel/CustomCarousel';
import { CarouselItem } from '../ui/carousel';
import { getCoupons } from '@/app/apis/getCoupons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const  CouponSection = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coupons'],
    queryFn: () => getCoupons(),
    select: (res) => res?.data?.data || [],
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  const onNavigateToCoupon = (id) => {
    router.push(`/cart`);
  };

  return (
    <div className="w-full md:px-4 pt-3 px-[4%] lg:px-[4%]">
      {/* Title */}
      <div className="font-bold font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle flex flex-row gap-2 items-center">
        <CustomImage
          src={pawLogo}
          alt="Paw Logo"
          className="inline-block mr-0 lg:h-7 w-auto h-4 lg:mb-2 mb-0"
        />
        <span>
          <span className="text-[#F59A11] text-xl md:text-3xl font-bold">Coupons You'll </span>
          <span className="text-[#F73518] text-xl md:text-3xl font-bold">Love ❤️</span>
        </span>
      </div>

      <CustomCarousel
      className="max-w-full"
      contentClassName=""
      itemClassName="flex flex-col items-center min-w-[80vw] sm:min-w-[40vw] md:min-w-[30vw] lg:min-w-[20vw] xl:min-w-[15vw]"
      >
        {data?.map((coupon, index) => (
          <CarouselItem key={index} className="flex flex-col items-center">
          <button
            type="button"
            aria-label={`Activate coupon ${index + 1}`}
            className="relative w-full h-40 md:h-56 outline-none focus:outline-none bg-transparent rounded-2xl transition-all duration-200 hover:scale-105 focus:scale-105 cursor-pointer overflow-hidden"
            onClick={() => {
              onNavigateToCoupon(coupon?._id);
            }}
          >
            {/* Background Image */}
            {/* <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat rounded-2xl shrink-0 grow-0 basis-full min-w-[20vw]"
              style={{ backgroundImage: `url('/coupon-bg.svg')` }}
            /> */}
            <CustomImage
              src="/coupon-bg.svg"
              alt={`Coupon ${index + 1}`}
              className="absolute inset-0 top-1/2 -translate-y-1/2 w-[450px] h-[180px] object-contain rounded-2xl"
              width={450}
              height={180}
            />

            {/* Coupon Content */}
            <div className="py-1 pl-2 pr-4 relative z-10 flex w-full h-full">
              <div className="flex flex-col items-center justify-center space-y-1 w-4/6 px-2">
                <div className="px-2 pb-1 flex flex-col items-center justify-center text-[#684A00] text-[20px] md:text-[28px] tracking-0 font-holtwood leading-[100%] font-[400]">
                  <span>DISCOUNT</span>
                  <span>COUPON</span>
                </div>
                <div className="flex items-center justify-center gap-2 font-bold text-[10px] md:text-xs text-[#181818] tracking-0 leading-[100%]">
                  <span>VALID TILL {formatDate(coupon?.endDate)}</span>
                </div>
              </div>

              <div className="ml-5  flex flex-col items-center justify-evenly py-5 text-[#684A00] font-gotham-rounded font-bold">
                <span className="text-[10px] md:text-xs mb-1 font-medium text-[#323232]">VOUCHER</span>
                <div className="flex flex-col items-center tracking-0 leading-[100%] space-y-1 font-holtwood font-[400]">
                  <span className="text-[24px] md:text-[22px] px-2">{coupon?.discountValue}{coupon?.discountType !== "fixed" ? "%" : "Rs"}</span>
                  <span className="text-[10px] md:text-xs">DISCOUNT</span>
                </div>
                <span className="text-[10px] md:text-sm text-[#004E6A] font-bold mt-1 hover:underline">APPLY</span>
              </div>
            </div>
          </button>
        </CarouselItem>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default CouponSection
