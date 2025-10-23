import React from "react";

const CartSummarySkeleton = () => {
  return (
    <div className="flex flex-col h-max justify-between bg-white rounded-xl">
      <div className="flex-shrink-0">
        <div className="p-4">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span role="img" aria-label="price">🏷️</span> Price Details
          </div>
          <div className="flex flex-col gap-2 text-base">
            {/* Total MRP Price skeleton */}
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
            
            {/* Coupon Discount skeleton */}
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
            
            {/* Shipping skeleton */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-40"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-[#f59a10]" />
      </div>

      <div className="p-4 flex-shrink-0">
        {/* To Pay section skeleton */}
        <div className="flex justify-between items-center text-lg font-bold mb-4">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
          <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
        </div>
        
        {/* Pay button skeleton */}
        <div className="w-full bg-gray-200 rounded-lg h-12 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CartSummarySkeleton;
