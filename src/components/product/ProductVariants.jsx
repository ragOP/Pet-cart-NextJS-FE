import React from "react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import { formatWeight } from "@/utils/formatWeight";
import { formatPrice } from "@/utils/formatPrice";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Separate component for individual variant to avoid hook order issues
const VariantItem = ({ 
  variant, 
  containerClass, 
  headerPadding, 
  contentPadding, 
  labelTextSize, 
  priceTextSize, 
  mrpTextSize, 
  discountTextSize, 
  spaceClass,
  selectedVariant,
  onVariantSelect,
  isSelectable,
  showAllSelected
}) => {
  const variantDiscount = calculateDiscountPercent(variant.price, variant.salePrice) || 0;
  const isSelected = selectedVariant === variant._id;
  const isMainProduct = variant._id === 'main-product';
  const labelRef = React.useRef(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  // Determine cursor and click handler based on use case
  let cursorClass, clickHandler;

  if (isSelectable) {
    cursorClass = 'cursor-pointer';
    clickHandler = () => onVariantSelect(variant._id);
  } else {
    cursorClass = '';
    clickHandler = undefined;
  }

  // Determine if this variant should appear selected
  const appearSelected = showAllSelected || isSelected;

  const labelText = isMainProduct ? variant.productLabel || formatWeight(variant.weight) : variant?.variantName;
  
  // Check if text is truncated on mount and when text changes
  React.useEffect(() => {
    if (labelRef.current) {
      const isTruncated = labelRef.current.scrollWidth > labelRef.current.clientWidth;
      setShowTooltip(isTruncated);
    }
  }, [labelText]);

  return (
    <div
      className={`${containerClass} overflow-hidden bg-white w-full ${cursorClass} transition-all duration-200 ${appearSelected ? 'border-[#004E6A] border-1' : 'border-gray-300'
        } flex flex-col`}
      onClick={clickHandler}
    >
      <div className={`${appearSelected ? 'bg-[#004E6A] text-white' : 'bg-gray-100 text-gray-800'} text-center ${headerPadding}`}>
        {showTooltip ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                ref={labelRef}
                className={`${labelTextSize} truncate overflow-hidden whitespace-nowrap`}
              >
                {labelText}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-gray-900 text-white">
              {labelText}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div 
            ref={labelRef}
            className={`${labelTextSize} truncate overflow-hidden whitespace-nowrap`}
          >
            {labelText}
          </div>
        )}
      </div>
      <div className={`bg-white text-center ${contentPadding} flex-1 flex flex-col justify-center`}>
        <div className={`flex items-center justify-center ${spaceClass} flex-nowrap`}>
          <span className={`${priceTextSize} text-black whitespace-nowrap`} style={{ letterSpacing: '-0.3px' }}>
            ₹{formatPrice(variant.salePrice || variant.price)}
          </span>
          {variant.price !== variant.salePrice && (
            <div className={`${mrpTextSize} text-gray-500 line-through whitespace-nowrap`} style={{ letterSpacing: '-0.7px' }}>
              MRP {formatPrice(variant.price)}
            </div>
          )}
        </div>
        {variantDiscount > 0 && (
          <div className={`flex items-center justify-center ${spaceClass}`}>
            <span className={`${discountTextSize} text-green-600`}>
              {Math.round(variantDiscount)}% OFF
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductVariants = ({
  variants = [],
  maxDisplay = 3,
  showDiscount = true,
  className = "",
  size = "small", // "small" or "large"
  selectedVariant = null,
  onVariantSelect = () => { },
  isSelectable = false, // New prop to differentiate between static and dynamic use cases
  showAllSelected = false, // New prop to show all variants as selected
  onMoreClick = null // Callback when "+X more" is clicked
}) => {
  if (!variants || variants.length === 0) {
    return null;
  }

  const isLarge = size === "large";
  const gapClass = isLarge ? "gap-2" : "gap-1 sm:gap-1.5";
  const marginClass = isLarge ? "mb-4" : "mb-1 sm:mb-2";
  const containerClass = isLarge ? "rounded-sm border-2" : "rounded sm:rounded-md border";
  const headerPadding = isLarge ? "py-1 px-2" : "py-1 px-2 sm:px-2";
  const contentPadding = isLarge ? "py-1 px-2" : "py-1 px-2 sm:px-2";
  const labelTextSize = isLarge ? "text-xs font-bold" : "text-[8px] sm:text-[9px] font-bold";
  const priceTextSize = isLarge ? "text-sm font-bold" : "text-[9px] sm:text-[10px] font-bold";
  const mrpTextSize = isLarge ? "text-xs" : "text-[7px] sm:text-[8px]";
  const discountTextSize = isLarge ? "text-xs font-extrabold" : "text-[7px] sm:text-[8px] font-extrabold";
  const spaceClass = isLarge ? "space-x-2" : "space-x-1 sm:space-x-1";

  const remainingCount = variants.length - maxDisplay;
  const showRemaining = remainingCount > 0;

  return (
    <div className={`${marginClass} ${className}`}>
      {/* Desktop: Show variants in a flex layout */}
      {/* For small size (product cards): compact no-wrap layout */}
      {/* For large size (product page): wrapping layout */}
      <div className={`hidden md:flex ${isLarge ? 'flex-wrap' : 'flex-nowrap'} ${size === "large" ? "gap-2" : "gap-1.5"} justify-start`}>
        {variants.slice(0, maxDisplay).map((variant, index) => (
          <div key={variant._id || index} className={`${
            isLarge 
              ? 'w-[calc(25%-0.375rem)] flex-shrink-0' 
              : showRemaining 
                ? 'flex-1 min-w-0 flex-shrink' 
                : maxDisplay === 2 
                  ? 'w-[calc(50%-0.375rem)] flex-shrink-0' 
                  : 'w-[calc(33.333%-0.5rem)] flex-shrink-0'
          }`}>
            <VariantItem
              variant={variant}
              containerClass={containerClass}
              headerPadding={headerPadding}
              contentPadding={contentPadding}
              labelTextSize={labelTextSize}
              priceTextSize={priceTextSize}
              mrpTextSize={mrpTextSize}
              discountTextSize={discountTextSize}
              spaceClass={spaceClass}
              selectedVariant={selectedVariant}
              onVariantSelect={onVariantSelect}
              isSelectable={isSelectable}
              showAllSelected={showAllSelected}
            />
          </div>
        ))}
        {showRemaining && (
          <div 
            className={`${containerClass} overflow-hidden ${isLarge ? 'w-[calc(25%-0.375rem)]' : 'w-[56px]'} flex-shrink-0 border-[#004E6A] flex flex-col justify-center items-center min-h-[44px] ${onMoreClick ? 'cursor-pointer bg-white hover:bg-gray-100 transition-all' : 'bg-white'}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onMoreClick) {
                onMoreClick();
              }
            }}
          >
            <div className={`bg-[#004E6A] text-white text-center w-full ${isLarge ? 'py-1 px-2' : 'py-1 px-1'}`}>
              <div className={`${isLarge ? 'text-xs' : 'text-[7px] sm:text-[8px]'} font-bold`}>
                More
              </div>
            </div>
            <div className={`bg-white text-center w-full ${isLarge ? 'py-1 px-2' : 'py-1 px-1'} flex-1 flex items-center justify-center`}>
              <div className={`${isLarge ? 'text-sm' : 'text-[9px] sm:text-[10px]'} font-bold text-[#F59A11] whitespace-nowrap`}>
                +{remainingCount}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Horizontal Scroll - Show all variants without "+X more" */}
      <div className="md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {variants.map((variant, index) => (
            <div key={variant._id || index} className={`${isLarge ? 'min-w-[160px] max-w-[160px]' : 'min-w-[110px] max-w-[110px]'} flex-shrink-0`}>
              <VariantItem
                variant={variant}
                containerClass={containerClass}
                headerPadding={headerPadding}
                contentPadding={contentPadding}
                labelTextSize={labelTextSize}
                priceTextSize={priceTextSize}
                mrpTextSize={mrpTextSize}
                discountTextSize={discountTextSize}
                spaceClass={spaceClass}
                selectedVariant={selectedVariant}
                onVariantSelect={onVariantSelect}
                isSelectable={isSelectable}
                showAllSelected={showAllSelected}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;
