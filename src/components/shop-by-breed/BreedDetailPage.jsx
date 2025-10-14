'use client'

import React, { useState } from 'react';
import BreedHero from './BreedHero';
import BreedCharacteristics from './BreedCharacteristics';
import BreedAdaptability from './BreedAdaptability';
import BreedDiet from './BreedDiet';
import BreedDietTips from './BreedDietTips';
import BreedCare from './BreedCare';
import BreedGrooming from './BreedGrooming';
import BreedNavigation from './BreedNavigation';
import BreedTraits from './BreedTraits';
import BreedHomeCookedFood from './BreedHomeCookedFood';
import Trending from '../home/Trending';
import Applod from '../home/Applod';

const BreedDetailPage = ({ breed, searchParams }) => {
  const [activeTab, setActiveTab] = useState('about');


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const isMobile = window.innerWidth < 768; // md breakpoint
      const offset = window.innerHeight * (isMobile ? 0.14 : 0.17); // 12.5% for mobile, 17% for desktop
      
      window.scrollTo({
        top: absoluteElementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (cardId) => {
    setActiveTab(cardId);
    scrollToSection(cardId);
  };

  return (
    <div className="min-h-screen bg-[#F8F5ED] relative overflow-hidden">
      {/* Background decorative elements */}
      {/* Main content */}
      <div className="relative flex flex-col z-10 w-full gap-2 sm:gap-4  py-2 sm:py-4">
        {/* Navigation Cards */}
        <BreedNavigation
          breed={breed}
          activeCard={activeTab}
          onCardClick={handleCardClick}
        />

        {/* Hero Section - About */}
        <div id="about">
          <BreedHero breed={breed} />
        </div>

        {/* Characteristics Section */}
        {/* <BreedCharacteristics breed={breed} /> */}

        {/* Adaptability Section */}
        <BreedAdaptability breed={breed} />


        <BreedTraits breed={breed} />



        {/* Diet Section */}
        <div id="diet">
          <BreedDiet breed={breed} />
        </div>


        {/* Diet Tips Section */}

        <Applod />

        <BreedHomeCookedFood breed={breed} />


        {/* Care Section - Training */}
        <div id="training">
          <BreedCare breed={breed} />
        </div>

        <BreedDietTips breed={breed} />


        {/* Grooming Section */}
        <div id="grooming">
          <BreedGrooming breed={breed} />
        </div>

        {/* Home Cooked Food Section */}

      </div>
    </div>
  );
};

export default BreedDetailPage; 