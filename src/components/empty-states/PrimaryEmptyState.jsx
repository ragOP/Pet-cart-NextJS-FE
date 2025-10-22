import React from "react";
import { Ghost } from "lucide-react";

const PrimaryEmptyState = ({ title = "Nothing here yet!", subtitle = "", buttonText = "", buttonOnClick }) => {
  const isSubTitlePresent = subtitle && subtitle.trim().length > 0;
  const isButtonPresent = buttonText && buttonText.trim().length > 0 && buttonOnClick && typeof buttonOnClick === 'function';
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-12 animate-fade-in">
      <Ghost size={56} className="text-gray-300 mb-4" />
      <span className="text-lg font-semibold text-gray-500 text-center">{title}</span>
      {isSubTitlePresent && <span className="text-lg text-gray-500 text-center w-[90%] mt-1">{subtitle}</span>}
      {isButtonPresent && <button className="bg-[#F59A11] mt-4 text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E08900] transition-colors" onClick={buttonOnClick}>{buttonText}</button>}
    </div>
  );
};

export default PrimaryEmptyState;
