import React from 'react';

const BreedCharacteristics = ({ breed }) => {
  return (
    <div className="mb-8 sm:mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left side - Additional characteristics can be added here */}
        <div className="space-y-4 sm:space-y-6">
          {/* Placeholder for additional breed information */}
        </div>

        {/* Right side - Additional details */}
        <div className="space-y-4 sm:space-y-6">
          {/* Additional breed details can be added here */}
        </div>
      </div>
    </div>
  );
};

export default BreedCharacteristics; 