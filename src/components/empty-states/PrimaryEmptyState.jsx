import React from "react";
import { Ghost } from "lucide-react";

const PrimaryEmptyState = ({ title = "Nothing here yet!" }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-12 animate-fade-in">
      <Ghost size={56} className="text-gray-300 mb-4" />
      <span className="text-lg font-semibold text-gray-500 text-center">{title}</span>
    </div>
  );
};

export default PrimaryEmptyState;
