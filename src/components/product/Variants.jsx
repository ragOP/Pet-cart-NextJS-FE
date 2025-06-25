import React from "react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";

const Variants = ({ variants, selectedVariant, onSelectVariant }) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {variants.map((variant, idx) => {
          const discount = calculateDiscountPercent(variant.price, variant.salePrice);
          return (
            <button
              key={variant._id}
              onClick={() => onSelectVariant(idx)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                selectedVariant === idx
                  ? "bg-orange-100 border-orange-400 text-orange-700"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              {variant.weight} {variant.salePrice ? `| ${discount}% OFF` : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Variants;
