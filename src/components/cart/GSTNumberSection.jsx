'use client';

import React, { useState } from 'react';
import GSTIcon from '@/components/icons/GSTIcon';

const GSTNumberSection = () => {
  const [gstNumber, setGstNumber] = useState('');

  const handleApply = () => {
    // Handle GST number application
    console.log('GST Number applied:', gstNumber);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-2 mb-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {/* GST Icon */}
          <GSTIcon className="w-6 h-6" />
          <h3 className="text-lg font-semibold  text-gray-900">
            I have a GST Number <span className="text-gray-500 font-normal">(Optional)</span>
          </h3>
        </div>
        
        <div className="relative w-full">
          <input
            type="text"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            placeholder="Enter GST Number"
            className="w-full px-3 py-2 pr-20 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f19813] focus:border-transparent"
          />
          <button
            onClick={handleApply}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#0b88b1] px-4 py-1 font-bold hover:bg-gray-100 rounded transition-colors"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default GSTNumberSection;
