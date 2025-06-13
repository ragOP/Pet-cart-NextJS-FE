'use client';

import React from 'react'
import pawLogo from '@/assets/essential/paws-logo.png'
import CustomImage from '@/components/images/CustomImage'
import '@/styles/hide-scrollbar.css'
import CustomCarousel from '@/components/carousel/CustomCarousel';
import { CarouselItem } from '../ui/carousel';

// Import product images from your assets
import prod1 from '@/assets/newLaunched/prod1.png'
import prod2 from '@/assets/newLaunched/prod2.png'
import prod3 from '@/assets/newLaunched/prod3.png'
import prod4 from '@/assets/newLaunched/prod4.png'
import prod5 from '@/assets/newLaunched/prod5.png'
import prod6 from '@/assets/newLaunched/prod6.png'
import prod7 from '@/assets/newLaunched/prod7.png'
import prod8 from '@/assets/newLaunched/prod8.png'

// Static data array
const essentials = [
  { id: 1, image: prod1, tag: 'BESTSELLER', label: 'Chicken Gravy' },
  { id: 2, image: prod2, tag: 'BESTSELLER', label: 'Chicken Gravy' },
  { id: 3, image: prod3, tag: 'BESTSELLER', label: 'Chicken Gravy' },
  { id: 4, image: prod4, tag: 'BESTSELLER', label: 'Chicken Gravy' },
  { id: 5, image: prod5, tag: 'BESTSELLER', label: 'Chicken Gravy' },
  { id: 6, image: prod6, tag: 'BESTSELLER', label: 'Chicken Gravy' },
  { id: 7, image: prod7, tag: 'BESTSELLER', label: 'Chicken Gravy' },
  { id: 8, image: prod8, tag: 'BESTSELLER', label: 'Chicken Gravy' },
]

function NewLaunched() {
  return (
    <div className="w-full px-4 py-6">
      {/* Title */}
      <h2 className="font-bold mb-4 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle">
        <span className="text-yellow-500">
          <CustomImage src={pawLogo} alt="Paw Logo" className="inline-block mr-0 h-6" width={24} height={24} />
        </span>{' '}
        <span className="text-[#F59A11]">Newly</span>{' '}
        <span className="text-[#0888B1]">Launched</span>
      </h2>

      {/* Carousel for newly launched products */}
      <CustomCarousel
        className="max-w-full"
        contentClassName=""
        itemClassName="flex flex-col items-center min-w-[20%] sm:min-w-[16.66%] md:min-w-[12.5%] lg:min-w-[10%] xl:min-w-[8.33%]"
      >
        {essentials.map((item) => (
          <CarouselItem key={item.id} className="flex flex-col items-center">
            {/* Tag */}
            <div className="bg-gradient-to-r from-[#F59A11] via-[#FFC369]  to-[#F6980A] text-white text-xs font-semibold px-2 py-1 rounded-t-md">
              {item.tag}
            </div>
            {/* Image */}
            <CustomImage
              src={item.image}
              alt={item.label}
              className="w-36 h-36 object-contain bg-white"
              width={144}
              height={144}
            />
            {/* Label */}
            <p className="text-sm mt-2 font-medium text-[#181818]">{item.label}</p>
            {/* Add to Cart Button */}
            <button className="mt-3 w-full bg-[#F59A11] hover:bg-[#e18a0e] text-white py-2 rounded-lg text-sm font-semibold transition-colors">
              ADD TO CART
            </button>
          </CarouselItem>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default NewLaunched;
