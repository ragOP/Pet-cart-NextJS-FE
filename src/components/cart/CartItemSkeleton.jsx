import React from "react";

const CartItemSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start border border-[#f59a10]  animate-pulse">
      {/* Image skeleton */}
      <div className="w-full sm:w-36 h-32 sm:h-36 bg-gray-200 rounded-lg flex-shrink-0"></div>

      <div className="flex-1 flex flex-col justify-between self-stretch w-full">
        {/* Top section skeleton */}
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-2">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
        </div>

        {/* Bottom section skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-2 mt-2 sm:mt-0">
          {/* Price section skeleton */}
          <div className="flex flex-col">
            <div className="h-6 bg-gray-200 rounded w-20 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>

          {/* Quantity controls skeleton */}
          <div className="flex items-center border border-gray-200 bg-gray-50 rounded-[24px] overflow-hidden">
            <div className="w-8 h-8 bg-gray-200"></div>
            <div className="w-10 h-8 bg-gray-200"></div>
            <div className="w-8 h-8 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
