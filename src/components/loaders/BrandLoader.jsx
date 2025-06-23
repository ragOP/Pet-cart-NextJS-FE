import React from "react";

// Creative loader: animated brand paw and text
const BrandLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-8 animate-fade-in">
      <div className="flex items-center space-x-3">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
          <ellipse cx="24" cy="42" rx="10" ry="5" fill="#0888B1"/>
          <ellipse cx="10" cy="28" rx="5" ry="8" fill="#F59A11"/>
          <ellipse cx="38" cy="28" rx="5" ry="8" fill="#F59A11"/>
          <ellipse cx="16" cy="14" rx="4" ry="6" fill="#F59A11"/>
          <ellipse cx="32" cy="14" rx="4" ry="6" fill="#F59A11"/>
        </svg>
        <span className="text-2xl font-bold text-[#0888B1] tracking-wider animate-pulse">PetCaart</span>
      </div>
      <span className="mt-4 text-[#F59A11] font-semibold text-lg tracking-wide">Loading...</span>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BrandLoader;
