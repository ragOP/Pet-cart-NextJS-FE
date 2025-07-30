'use client'

import React from 'react';
import CustomImage from '@/components/images/CustomImage';

const BreedNavigation = ({ cards, activeCard, onCardClick }) => {
  const getCardContent = (id) => {
    switch (id) {
      case 'about':
        return {
          image: 'https://pngimg.com/uploads/german_shepherd/german_shepherd_PNG51.png',
          text: 'ABOUT'
        };
      case 'diet':
        return {
          image: 'https://pngimg.com/uploads/german_shepherd/german_shepherd_PNG51.png',
          text: 'DIET'
        };
      case 'training':
        return {
          image: 'https://pngimg.com/uploads/german_shepherd/german_shepherd_PNG51.png',
          text: 'TRAINING'
        };
      case 'grooming':
        return {
          image: 'https://pngimg.com/uploads/german_shepherd/german_shepherd_PNG51.png',
          text: 'GROOMING'
        };
      default:
        return {
          image: 'https://cdn-icons-png.flaticon.com/512/1995/1995574.png',
          text: 'ABOUT'
        };
    }
  };

  return (
    <div className="flex justify-center mb-4 sm:mb-8 px-2 sm:px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-8 w-full max-w-4xl">
        {cards.map((card) => {
          const content = getCardContent(card.id);
          return (
            <button
              key={card.id}
              onClick={() => onCardClick(card.id)}
              className={`flex items-center relative gap-0 px-2 sm:px-3 md:px-4 py-2 rounded-xl transition-all duration-200 font-medium text-xs sm:text-sm border-2 w-full ${activeCard === card.id
                  ? 'border-[#B4700A] bg-[#F1DDC0]'
                  : 'border-[#B4700A] bg-[#F1DDC0] hover:bg-[#E8D4B8]'
                }`}
            >
              {/* Dog image positioned at bottom */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 relative flex-shrink-0">
                <CustomImage
                  src={content.image}
                  alt={card.label}
                  className="w-full absolute bottom-[-8px] sm:bottom-[-10px] h-full object-cover rounded-lg"
                  width={48}
                  height={48}
                />
              </div>

              {/* Right side - Text */}
              <div className="flex items-center justify-center text-center flex-1">
                <span className="font-bold text-[#B4700A] text-xs sm:text-base md:text-xl text-center" style={{
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