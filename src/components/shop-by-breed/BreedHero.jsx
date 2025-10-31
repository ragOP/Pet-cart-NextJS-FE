'use client'

import React from 'react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from '../PawsTitle';

const BreedHero = ({ breed }) => {
  // Function to get background and text color based on color name
  const getColorStyles = (colorName) => {
    const lowerColor = colorName.toLowerCase();
    
    if (lowerColor.includes('black & tan') || lowerColor.includes('black and tan')) {
      return {
        bg: 'bg-gradient-to-br from-black via-amber-800 to-amber-600',
        text: 'text-white'
      };
    }
    if (lowerColor.includes('black')) {
      return {
        bg: 'bg-black',
        text: 'text-white'
      };
    }
    if (lowerColor.includes('white')) {
      return {
        bg: 'bg-white border-2 border-gray-300',
        text: 'text-gray-800'
      };
    }
    if (lowerColor.includes('tan') || lowerColor.includes('sable')) {
      return {
        bg: 'bg-gradient-to-b from-amber-600 to-amber-700',
        text: 'text-white'
      };
    }
    if (lowerColor.includes('golden') || lowerColor.includes('gold')) {
      return {
        bg: 'bg-gradient-to-b from-yellow-400 to-yellow-600',
        text: 'text-gray-900'
      };
    }
    if (lowerColor.includes('brown') || lowerColor.includes('chocolate')) {
      return {
        bg: 'bg-gradient-to-b from-amber-800 to-amber-900',
        text: 'text-white'
      };
    }
    if (lowerColor.includes('red')) {
      return {
        bg: 'bg-gradient-to-b from-red-600 to-red-700',
        text: 'text-white'
      };
    }
    if (lowerColor.includes('cream') || lowerColor.includes('beige')) {
      return {
        bg: 'bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-300',
        text: 'text-gray-800'
      };
    }
    if (lowerColor.includes('gray') || lowerColor.includes('grey') || lowerColor.includes('silver')) {
      return {
        bg: 'bg-gradient-to-b from-gray-400 to-gray-500',
        text: 'text-white'
      };
    }
    // Default fallback
    return {
      bg: 'bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300',
      text: 'text-gray-800'
    };
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 px-[5%]">
      <PawsTitle title={breed.name} classNameTitle={"text-[24px] sm:text-[28px] md:text-[32px] pt-2"} imageProps={{
        height: 60,
        width: 60,
        className: "inline-block mr-0 h-8"
      }} />

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:items-stretch">
        {/* Left Side - Image - Match Right Height */}
        <div className="w-full lg:w-2/5 h-auto lg:min-h-[50vh] xl:min-h-[60vh] lg:flex">
          <div className="bg-[#EBEBEB] rounded-xl p-3 sm:p-4 w-full lg:h-full lg:flex-1">
            <div className="bg-[#c6c6c6] rounded-lg shadow-sm w-full h-full" style={{
              border: '1px dashed #6A6868',
              boxShadow: '0px 5px 50px -9px #0000000D, 0px 0px 0px 0px #00000026'
            }}>
              <div className="relative w-full h-full bg-opacity-15 rounded-lg">
                <CustomImage
                  src={breed.image || 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop'}
                  alt={breed.name}
                  className="object-cover h-full w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Description and Characteristics - Match Left Height */}
        <div className="w-full lg:w-3/5 h-auto lg:min-h-[50vh] xl:min-h-[60vh] lg:flex">
          <div className="bg-[#FFEACD] rounded-xl p-3 sm:p-4 xl:p-5 2xl:p-6 w-full lg:h-full lg:flex-1">
            <div className="bg-[#ffe3b9] flex flex-col rounded-lg px-3 sm:px-4 xl:px-6 2xl:px-8 py-3 sm:py-5 xl:py-6 2xl:py-8 shadow-sm h-full gap-4 sm:gap-6 xl:gap-8" style={{
              border: '2.74px dashed #F59A11'
            }}>
              {/* Description */}
              <div className="flex-1 flex items-start">
                <h4 
                  className='text-gray-800 text-[1rem] sm:text-[1.35rem] xl:text-[1.5rem] 2xl:text-[1.65rem] leading-relaxed'
                  dangerouslySetInnerHTML={{ __html: breed.description }}
                />
              </div>

              {/* Characteristics */}
              <div className="space-y-3 sm:space-y-4 xl:space-y-5 2xl:space-y-6">
                  {/* Color */}
                  {breed.characteristics?.colors && breed.characteristics.colors.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex items-center space-x-2 sm:space-x-3 xl:space-x-4">
                        <span className="text-base sm:text-lg xl:text-xl 2xl:text-2xl">🎨</span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em] xl:text-[1.15em] 2xl:text-[1.25em]">Color:</span>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 xl:gap-3">
                        {breed.characteristics.colors.map((color, index) => {
                          const styles = getColorStyles(color);
                          return (
                            <span 
                              key={index}
                              className={`inline-flex items-center justify-center px-3 sm:px-6 xl:px-7 2xl:px-8 py-1 sm:py-2 xl:py-2.5 2xl:py-3 text-xs sm:text-sm xl:text-base 2xl:text-lg font-medium shadow-sm ${styles.bg} ${styles.text}`}
                            >
                              {color}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Weight */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3 xl:space-x-4">
                      <span className="text-base sm:text-lg xl:text-xl 2xl:text-2xl">⚖️</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em] xl:text-[1.15em] 2xl:text-[1.25em]">Weight:</span>
                    </div>
                    <span className="text-sm sm:text-[1.05em] xl:text-[1.15em] 2xl:text-[1.25em] font-medium" style={{ color: '#004e6a' }}>
                      {breed.characteristics?.weightDetails?.male || '30-40kgs'} (male), {breed.characteristics?.weightDetails?.female || '25-35kgs'} (female)
                    </span>
                  </div>

                  {/* Height */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3 xl:space-x-4">
                      <span className="text-base sm:text-lg xl:text-xl 2xl:text-2xl">📏</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em] xl:text-[1.15em] 2xl:text-[1.25em]">Height:</span>
                    </div>
                    <span className="text-sm sm:text-[1.05em] xl:text-[1.15em] 2xl:text-[1.25em] font-medium" style={{ color: '#004e6a' }}>
                      {breed.characteristics?.heightDetails?.male || '61-66cm'} (male), {breed.characteristics?.heightDetails?.female || '56-61cm'} (female)
                    </span>
                  </div>

                  {/* Coat Type */}
                  {breed.characteristics?.coat && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex items-center space-x-2 sm:space-x-3 xl:space-x-4">
                        <span className="text-base sm:text-lg xl:text-xl 2xl:text-2xl">🧥</span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-[1.05em] xl:text-[1.15em] 2xl:text-[1.25em]">Coat:</span>
                      </div>
                      <span className="text-sm sm:text-[1.05em] xl:text-[1.15em] 2xl:text-[1.25em] font-medium" style={{ color: '#004e6a' }}>
                        {breed.characteristics.coat}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BreedHero; 
