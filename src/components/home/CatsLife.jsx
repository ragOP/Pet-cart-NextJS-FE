'use client';

import React from 'react'
import CustomImage from '@/components/images/CustomImage';

// Import your cat life images
import cat1 from '@/assets/catslife/cat1.png'
import cat2 from '@/assets/catslife/cat2.png'
import cat3 from '@/assets/catslife/cat3.png'
import cat4 from '@/assets/catslife/cat4.png'
import pawLogo from '@/assets/essential/paws-logo.png' // optional

const items = [
  { id: 1, image: cat1, label: 'Chicken Gravy' },
  { id: 2, image: cat2, label: 'Chicken Gravy' },
  { id: 3, image: cat3, label: 'Chicken Gravy' },
  { id: 4, image: cat4, label: 'Chicken Gravy' }
]

const CatsLife = () => {
  return (
    <div className="w-full px-4 py-6">
      {/* Title */}
      <h2 className="font-bold mb-6 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle">
        <span className="text-yellow-500">
          <CustomImage src={pawLogo} alt="Paw Logo" className="inline-block mr-1 h-6" />
        </span>
        <span className="text-[#F59A11]"> A Day In Your </span>
        <span className="text-[#0888B1]">Cat&apos;s Life...</span>
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-start bg-white rounded-lg overflow-hidden"
          >
            <CustomImage
              src={item.image}
              alt={item.label}
              className="w-full h-[220px] object-cover rounded-lg"
            />
            <div className="mt-2 px-1">
              <p className="text-sm font-semibold text-[#181818]">{item.label}</p>
              <p className="text-xs text-[#181818] mt-1">Shop Now &gt;</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatsLife
