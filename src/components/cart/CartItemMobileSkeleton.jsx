import React from "react";

const CartItemMobileSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-3 flex gap-3 items-start border border-[#f59a10] w-full animate-pulse">
      {/* Image skeleton - Small and compact */}
      <div className="w-30 h-30 bg-gray-200 rounded-lg flex-shrink-0"></div>

      {/* Content skeleton */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Top row skeleton - Title and Trash */}
        <div className="flex justify-between items-start">
          <div className="h-4 bg-gray-200 rounded w-3/4 flex-1 pr-2"></div>
        </div>

        {/* Middle row skeleton - Quantity/Offer tag */}
        <div className="flex items-center gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
        </div>

        {/* Bottom row skeleton - Price and Quantity controls */}
        <div className="flex justify-between items-center">
          {/* Price section skeleton */}
          <div className="flex flex-col">
            <div className="h-5 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>

          {/* Quantity controls skeleton */}
          <div className="flex items-center border border-gray-200 bg-gray-50 rounded-[20px] overflow-hidden">
            <div className="w-6 h-6 bg-gray-200"></div>
            <div className="w-8 h-6 bg-gray-200"></div>
            <div className="w-6 h-6 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemMobileSkeleton;
