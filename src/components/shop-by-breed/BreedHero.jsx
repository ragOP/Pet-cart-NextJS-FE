'use client'

import React from 'react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from '../PawsTitle';

const BreedHero = ({ breed }) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <PawsTitle title={breed.name} classNameTitle={"text-[24px] sm:text-[28px] md:text-[32px] pt-2"} imageProps={{
        height: 60,
        width: 60,
        className: "inline-block mr-0 h-6 sm:h-8"
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-6 lg:gap-8 items-start">
        {/* Left Column - Breed Image and Description Card */}
        <div className="lg:col-span-3 h-auto lg:h-[29.625rem]">
          {/* Outer box with padding 4 and #EBEBEB background */}
          <div className="bg-[#EBEBEB] rounded-xl p-3 sm:p-4">
            {/* Main box with border and #c6c6c6 background */}
            <div className="bg-[#c6c6c6] rounded-lg p-3 sm:p-4 shadow-sm" style={{
              border: '2.74px dashed #6A6868',
              boxShadow: '0px 5px 50px -9px #0000000D, 0px 0px 0px 0px #00000026'
            }}>
              <div className="relative h-48 sm:h-64 mb-3 sm:mb-4 bg-opacity-15 rounded-lg">
                <CustomImage
                  src={breed.image || 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop'}
                  alt={breed.name}
                  className="absolute top-[-40px] sm:top-[-60px] left-0 right-0 h-56 sm:h-80 object-cover rounded-lg"
                  width={400}
                  height={250}
                />
              </div>

              {/* Description */}
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-2 italic">{breed.name}</h2>
                <p className="text-gray-700 text-sm sm:text-[1.2rem] leading-relaxed">
                  The Canine,
                  All-Stars - Protecting, Serving,
                  and Winning Hearts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Two Stacked Characteristic Cards */}
        <div className="lg:col-span-7">
          {/* Additional div above with p-5 and #EBEBEB background */}
          <div className="space-y-4 sm:space-y-6">
            {/* Top Card - Orange/Tan Theme - Basic Characteristics */}
            {/* Outer box with padding and #FFEACD background */}
            <div className="bg-[#FFEACD] rounded-xl p-3 sm:p-4">
              {/* Inner box with #ffe3b9 background and border */}
              <div className="bg-[#ffe3b9] rounded-lg p-3 sm:p-4 shadow-sm" style={{
                border: '2.74px dashed #F59A11'
              }}>
                <div className="space-y-3 sm:space-y-4">
                  {/* Color */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg">🎨</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em]">Color:</span>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <span className="px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-light bg-gradient-to-b from-amber-200 to-amber-300 text-gray-800 shadow-sm">
                        Black & Tan
                      </span>
                      <span className="px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-light bg-gradient-to-b from-gray-700 to-gray-800 text-white shadow-sm">
                        Black
                      </span>
                      <span className="px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-light bg-gradient-to-b from-white to-gray-100 text-gray-800 shadow-sm border border-gray-200">
                        White
                      </span>
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg">⚖️</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em]">Weight:</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-[1.05em]">
                      {breed.weight?.male || '30-40kgs'} (male), {breed.weight?.female || '25-35kgs'} (female)
                    </span>
                  </div>

                  {/* Height */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg">📏</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em]">Height:</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-[1.05em]">
                      {breed.height?.male || '61-66cm'} (male), {breed.height?.female || '56-61cm'} (female)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card - Light Blue Theme - Life & Physical Traits */}
            {/* Outer box with padding and #E6F3F7 background */}
            <div className="bg-[#E6F3F7] rounded-xl p-3 sm:p-4">
              {/* Inner box with #E6F3F7 background and border */}
              <div className="bg-[#E6F3F7] rounded-lg p-3 sm:p-4 shadow-sm" style={{
                border: '2.74px dashed #0888B1'
              }}>
                <div className="space-y-3 sm:space-y-4">
                  {/* Life Expectancy */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg">❤️</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em]">Life expectancy:</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-[1.05em]">{breed.lifeExpectancy || '10-12 years'}</span>
                  </div>

                  {/* Size */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg">🐕</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em]">Size:</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-[1.05em]">{breed.size || 'Large'}</span>
                  </div>

                  {/* Shedding */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg">🪶</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em]">Shedding:</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-[1.05em]">{breed.shedding || 'High'}</span>
                  </div>

                  {/* Coat */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-base sm:text-lg">🐾</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em]">Coat:</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-[1.05em]">{breed.coat || 'Straight or wavy'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedHero; 