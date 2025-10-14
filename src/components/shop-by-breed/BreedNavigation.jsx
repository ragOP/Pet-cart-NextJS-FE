'use client'

import React from 'react';
import CustomImage from '@/components/images/CustomImage';

const BreedNavigation = ({ breed, activeCard, onCardClick }) => {
  // Get navigation data from breed object
  const navigationData = breed?.navigation || [];
  
  const getCardContent = (id) => {
    // Find the navigation item by matching the card id with navigation title
    const navItem = navigationData.find(item => 
      item.title.toLowerCase() === id || 
      (id === 'about' && item.title.toLowerCase() === 'about')
    );
    
    if (navItem) {
      return {
        image: navItem.image,
        text: navItem.title
      };
    }
    
    // Fallback for missing data
    return {
      image: 'https://cdn-icons-png.flaticon.com/512/1995/1995574.png',
      text: id.toUpperCase()
    };
  };

  return (
    <div className="flex justify-center mb-4 sm:mb-8 px-2 sm:px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-8 w-full max-w-4xl">
        {navigationData.map((navItem, index) => {
          const content = getCardContent(navItem.title.toLowerCase());
          const cardId = navItem.title.toLowerCase();
          
          return (
            <button
              key={navItem.title}
              onClick={() => onCardClick(cardId)}
              className={`flex items-center relative gap-0 px-2 sm:px-3 md:px-4 py-2 rounded-xl transition-all duration-200 font-medium text-xs sm:text-sm border-2 w-full ${activeCard === cardId
                  ? 'border-[#B4700A] bg-[#F1DDC0]'
                  : 'border-[#B4700A] bg-[#F1DDC0] hover:bg-[#E8D4B8]'
                }`}
            >
              {/* Dog image positioned at bottom */}
              <div className="w-9 h-9 sm:w-8 sm:h-8 md:w-10 md:h-10 relative flex-shrink-0">
                <CustomImage
                  src={content.image}
                  alt={navItem.title}
                  className="w-full absolute bottom-[-8px] sm:bottom-[-10px] h-full object-cover rounded-lg"
                  width={60}
                  height={60}
                />
              </div>

              {/* Right side - Text */}
              <div className="flex items-center justify-center text-center flex-1">
                <span className="font-bold text-[#B4700A] text-lg sm:text-base md:text-xl text-center" style={{
                  fontWeight: 700,
                  fontStyle: 'normal',
                  textShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset',
                  textAlign: 'center'
                }}>{content.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BreedNavigation; 