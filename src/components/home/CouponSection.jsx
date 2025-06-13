'use client';

import React from 'react'
import heartLogo from '@/assets/coupon/HEART.png'
import coupon1 from '@/assets/coupon/coupon1.png'
import coupon2 from '@/assets/coupon/coupon2.png'
import coupon3 from '@/assets/coupon/coupon3.png'
import pawLogo from '@/assets/essential/paws-logo.png' // Optional if you want paw icon
import CustomImage from '@/components/images/CustomImage';

const CouponSection = () => {
  const coupons = [coupon1, coupon2, coupon3]

  return (
    <div className="w-full px-4 py-6">
      {/* Title */}
      <h2 className="font-bold mb-4 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle">
        <span className="text-yellow-500">
          <CustomImage src={pawLogo} alt="Paw Logo" className="inline-block mr-1 h-6" />
        </span>{' '}
        <span className="text-[#F59A11]">Coupons You&apos;ll </span>{' '}
        <span className="text-[#F73518]">Love</span>
        <CustomImage src={heartLogo} alt="Heart Logo" className="inline-block ml-2 h-6" />
      </h2>

      {/* Scrollable coupon strip */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 w-max">
          {coupons.map((img, index) => (
            <CustomImage
              key={index}
              src={img}
              alt={`Coupon ${index + 1}`}
              className="w-[400px] h-auto rounded-lg  object-contain"
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default CouponSection
