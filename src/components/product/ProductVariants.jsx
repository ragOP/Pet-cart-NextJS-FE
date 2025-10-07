import React from "react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import { formatWeight } from "@/utils/formatWeight";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductVariants = ({ 
  variants = [], 
  maxDisplay = 3, 
  variantLabel = "",
  showDiscount = true,
  className = "",
  size = "small", // "small" or "large"
  selectedVariant = null,
  onVariantSelect = () => {},
  isSelectable = false // New prop to differentiate between static and dynamic use cases
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
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

  // For mobile carousel, show 2 items at a time
  const itemsToShow = 2;
  const maxIndex = Math.max(0, variants.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const renderVariant = (variant, index) => {
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
      <div key={variant._id || index} className="relative flex-shrink-0">
        {/* Variant card */}
        <div 
          className={`${containerClass} overflow-hidden bg-white w-content ${cursorClass} transition-all duration-200 ${
            isSelected ? 'border-[#004E6A] border-2' : 'border-gray-300'
          }`}
          onClick={clickHandler}
        >
          <div className={`${isSelected ? 'bg-[#004E6A] text-white' : 'bg-gray-100 text-gray-800'} text-center ${headerPadding}`}>
            <div className={labelTextSize}>
              {isMainProduct ? variant.productLabel || 'Default' : variant?.variantName}
            </div>
          </div>
          <div className={`bg-white text-center ${contentPadding}`}>
            <div className={`flex items-center justify-center ${spaceClass}`}>
              <span className={`${priceTextSize} text-black`}>
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
  };

  return (
    <div className={`${marginClass} ${className}`}>
      {/* Desktop: Show all variants in a flex wrap */}
      <div className="hidden md:flex flex-wrap gap-2">
        {variants.slice(0, maxDisplay).map((variant, index) => renderVariant(variant, index))}
      </div>

      {/* Mobile: Carousel */}
      <div className="md:hidden relative">
        <div className="flex overflow-hidden">
          <div 
            className="flex gap-2 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {variants.slice(0, maxDisplay).map((variant, index) => renderVariant(variant, index))}
          </div>
        </div>
        
        {/* Navigation arrows */}
        {variants.length > itemsToShow && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md transition-all ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-3 h-3 text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              disabled={currentIndex === maxIndex}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md transition-all ${
                currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              <ChevronRight className="w-3 h-3 text-gray-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductVariants;
