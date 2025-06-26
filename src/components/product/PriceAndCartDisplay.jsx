import React from "react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";

const PriceAndCartDisplay = ({ price, salePrice, onAddToCart }) => {
  const discount = calculateDiscountPercent(price, salePrice);
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-between md:pr-4">
      <div className="flex flex-col gap w-full md:w-1/2">
        <span className="text-3xl font-bold">₹{salePrice || price || 0}</span>
        {salePrice && (
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-600 font-normal">
              MRP{" "}
              <span className="text-xl text-gray-500 line-through font-normal">
                ₹{price || 0}
              </span>
            </span>
            <span className="text-[#218032] text-xl font-normal">
              ({discount || 0}% Off)
            </span>
          </div>
        )}
        <p className="text-sm text-[#0888B1]">incl. of all taxes</p>
      </div>

      <button
        onClick={onAddToCart}
        className="w-full md:w-fit h-fit bg-[#F59A11] hover:bg-[#D9820A] text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D9820A]"
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default PriceAndCartDisplay;
