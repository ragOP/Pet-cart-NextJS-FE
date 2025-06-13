import React from "react";
import CustomImage from "@/components/images/CustomImage";

const ProductGradientItem = ({
  image,
  alt,
  label,
  tag,
  chip,
  className = "",
}) => {
  return (
    <div className={`w-full flex flex-col items-center cursor-pointer ${className}`}>
      {/* Chip above the card */}
      {chip && (
        <div className="flex justify-center w-full">
          <span className="inline-block rounded-t-[6px] border-t border-x border-b-0 bg-gradient-to-r from-[#F59A11] via-[#FFC369] to-[#F6980A] text-white text-xs font-semibold px-2 py-1 shadow-md border-[#EDBC72]">
            {chip}
          </span>
        </div>
      )}

      {/* Gradient border wrapper */}
      <div className={`rounded-[22px] p-[1.38px] bg-gradient-to-b from-[#E1C9A7]/20 via-[#D7B27B] via-50% to-[#FFB84C] group hover:shadow-lg hover:ring-2 hover:ring-[#F59A11]`}>
        <div
          className="flex flex-col items-center p-2 rounded-[20.5px] group-hover:bg-[#fff6ea] group-hover:bg-opacity-80 transition-colors"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%)",
          }}
        >
          {/* Tag inside the card */}
          {tag && (
            <div className="bg-gradient-to-r from-[#F59A11] via-[#FFC369] to-[#F6980A] text-white text-xs font-semibold px-2 py-1 rounded-t-md mb-2">
              {tag}
            </div>
          )}

          {/* Product image */}
          <CustomImage
            src={image}
            alt={alt}
            className="w-32 h-32 object-contain transition-all group-hover:scale-110 group-focus:scale-110"
            width={124}
            height={124}
            loading="lazy"
          />
        </div>
      </div>

      {/* Label below the card */}
      <p className="text-sm font-medium text-[#181818] text-center mt-2 transition-all underline-offset-4 decoration-2 group-hover:underline group-hover:decoration-[#F59A11] group-focus:underline group-focus:decoration-[#F59A11]">
        {label}
      </p>
    </div>
  );
};

export default ProductGradientItem;
