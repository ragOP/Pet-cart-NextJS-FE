import React from "react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";

const PriceDisplay = ({ price, salePrice }) => {
  const discount = calculateDiscountPercent(price, salePrice);
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold">₹{salePrice || price}</span>
        {salePrice && (
          <>
            <span className="text-lg text-gray-500 line-through">₹{price}</span>
            <span className="text-green-600 font-semibold">({discount}% Off)</span>
          </>
        )}
      </div>
      <p className="text-sm text-gray-500">incl. of all taxes</p>
    </div>
  );
}

export default PriceDisplay;