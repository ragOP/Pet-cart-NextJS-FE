import React from "react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";

const ProductVariants = ({ 
  variants = [], 
  maxDisplay = 3, 
  variantLabel = "10KG (2x5KG)",
  showDiscount = true,
  className = "",
  size = "small", // "small" or "large"
  selectedVariant = null,
  onVariantSelect = () => {},
  isSelectable = false // New prop to differentiate between static and dynamic use cases
}) => {
  if (!variants || variants.length === 0) {
    return null;
  }

  const isLarge = size === "large";
  const gapClass = isLarge ? "gap-2" : "gap-1";
  const marginClass = isLarge ? "mb-4" : "mb-2 sm:mb-2";
  const containerClass = isLarge ? "rounded-lg border-2" : "rounded-md sm:rounded-lg border";
  const headerPadding = isLarge ? "py-1 px-2" : "py-0.5 px-0.5 sm:px-1";
  const contentPadding = isLarge ? "py-1 px-2" : "py-0.5 px-0.5 sm:px-1";
  const labelTextSize = isLarge ? "text-xs font-bold" : "text-[7px] sm:text-[8px] font-bold";
  const priceTextSize = isLarge ? "text-sm font-bold" : "text-[9px] sm:text-[10px] font-bold";
  const mrpTextSize = isLarge ? "text-xs" : "text-[6px] sm:text-[7px]";
  const discountTextSize = isLarge ? "text-xs font-extrabold" : "text-[6px] sm:text-[7px] font-extrabold";
  const spaceClass = isLarge ? "space-x-2" : "space-x-1 sm:space-x-2";

  return (
    <div className={`flex flex-wrap ${gapClass} ${marginClass} ${className}`}>
      {variants.slice(0, maxDisplay).map((variant, index) => {
        const variantDiscount = calculateDiscountPercent(variant.price, variant.salePrice) || 0;
        const isSelected = selectedVariant === variant._id;
        const isMainProduct = variant._id === 'main-product';
        
        // Determine cursor and click handler based on use case
        let cursorClass, clickHandler;
        
        if (isSelectable) {
          cursorClass = 'cursor-pointer';
          clickHandler = () => onVariantSelect(variant._id);
        } else {
          cursorClass = '';
          clickHandler = undefined;
        }
        
        return (
          <div key={variant._id || index} className="relative">
            {/* Selection border wrapper - only for selectable case */}
            {isSelectable && isSelected && (
              <div className={`absolute -inset-1 border-3 border-yellow-500 ${containerClass.includes('rounded-xl') ? 'rounded-xl' : 'rounded-xl sm:rounded-xl'} pointer-events-none`}></div>
            )}
            
            {/* Original variant card */}
            <div 
              className={`${containerClass} border-[#004E6A] overflow-hidden bg-white w-content ${cursorClass} transition-all duration-200`}
              onClick={clickHandler}
            >
              <div className={`bg-[#004E6A] text-white text-center ${headerPadding}`}>
                <div className={labelTextSize}>
                  {isMainProduct ? `${variant.weight || 'Default'}` : variantLabel}
                </div>
              </div>
              <div className={`bg-white text-center ${contentPadding}`}>
                <div className={`flex items-center justify-center ${spaceClass}`}>
                  <span className={`${priceTextSize} text-[#004E6A]`}>
                    ₹ {variant.salePrice || variant.price}
                  </span>
                  {variant.price !== variant.salePrice && (
                    <div className={`${mrpTextSize} text-gray-500 line-through`}>
                      MRP {variant.price}
                    </div>
                  )}
                </div>
                {showDiscount && (
                  <div className={`flex items-center justify-center ${spaceClass}`}>
                    {variantDiscount > 0 && (
                      <span className={`${discountTextSize} text-green-600`}>
                        {Math.round(variantDiscount)}% OFF
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariants;
