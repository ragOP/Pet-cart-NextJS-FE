import React from "react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import VariantBoxIcon from "@/icons/VariantBoxIcon";
import { formatWeight } from "@/utils/formatWeight";

const Variants = ({ variants, selectedVariant, onSelectVariant }) => {
  console.log(variants, "variants");
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-row gap-2">
      <VariantBoxIcon />
      <div className="flex flex-wrap gap-2">
        {variants.map((variant, index) => {
          const discount = calculateDiscountPercent(
            variant.price,
            variant.salePrice
          );
          return (
            <VariantBox
              key={variant._id}
              index={index}
              onSelectVariant={onSelectVariant}
              variant={variant}
              discount={discount}
              isSelected={selectedVariant === variant._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Variants;

export const VariantBox = ({
  onSelectVariant,
  variant,
  discount,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onSelectVariant(variant?._id)}
      className={`flex cursor-pointer items-center py-1.5 px-4 rounded-xl ${
        isSelected
          ? "bg-[rgba(0,78,106,0.2)] font-medium"
          : "bg-[#6A68681A] font-normal"
      }`}
    >
      <span className="text-sm">
        {variant.variant_name || formatWeight(variant.weight)}
        {" "}{variant.salePrice && discount > 0 ? `| ${discount}% OFF` : null}
      </span>
    </div>
  );
};
