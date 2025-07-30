'use client'

import React, { useState } from 'react';
import BreedHero from './BreedHero';
import BreedCharacteristics from './BreedCharacteristics';
import BreedAdaptability from './BreedAdaptability';
import BreedNavigation from './BreedNavigation';
import BreedTraits from './BreedTraits';

const BreedDetailPage = ({ breed, searchParams }) => {
  const [activeTab, setActiveTab] = useState('about');

  const cards = [
    { id: 'about', label: 'ABOUT', icon: '🐾' },
    { id: 'diet', label: 'DIET', icon: '🍽️' },
    { id: 'training', label: 'TRAINING', icon: '🎾' },
    { id: 'grooming', label: 'GROOMING', icon: '🪮' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5ED] relative overflow-hidden">
      {/* Background decorative elements */}
      {/* Main content */}
      <div className="relative z-10 w-full px-2 sm:px-4 py-2 sm:py-4">
        {/* Navigation Cards */}
        <BreedNavigation
          cards={cards}
          activeCard={activeTab}
          onCardClick={setActiveTab}
        />

        {/* Hero Section */}
        <BreedHero breed={breed} />

        {/* Characteristics Section */}
        <BreedCharacteristics breed={breed} />

        {/* Adaptability Section */}
        <BreedAdaptability breed={breed} />

        <BreedTraits breed={breed} />


      </div>
    </div>
  );
};

export default BreedDetailPage; 