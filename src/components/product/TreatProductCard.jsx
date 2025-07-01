import React from "react";
import CustomImage from "@/components/images/CustomImage";
import discountLogo from "@/assets/treats/discount.png";

const TreatProductCard = ({ item, onAdd }) => (
  <div className="group flex flex-col items-center rounded-xl p-2 transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-[#004E6A] focus-within:scale-105 cursor-pointer bg-transparent">
    <div className="relative">
      <div className="w-32 h-40 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
        <CustomImage
          src={item.images?.[0]}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>
      {/* <span className="absolute top-0 left-1/2 transform -translate-x-1/2 px-2 py-1 align-center">
        <CustomImage
          src={discountLogo}
          alt="Discount"
          className="w-25 h-6 align-center inline-block"
        />
      </span> */}
    </div>
    <p className="mt-2 text-sm font-medium text-center text-[#181818] line-clamp-3 max-h-[4.5em]">
      {item.title}
    </p>
    <div className="mt-1 text-center text-sm font-semibold flex items-baseline justify-center gap-1">
      <span className="text-[16px] text-[#181818] font-bold">₹</span>
      <span className="text-[24px] text-[#181818] font-bold">{item.price}</span>
      {item.oldPrice && (
        <span className="flex items-baseline line-through text-gray-500 font-normal ml-1">
          <span className="text-[16px]">₹</span>
          <span className="text-[18px]">{item.oldPrice}</span>
        </span>
      )}
    </div>
    <button
      className="w-30 mt-2 border-2 border-[#004E6A] text-[#004E6A] py-1 rounded-md font-semibold md:w-35 md:h-10 hover:bg-[#004E6A] hover:text-white focus:bg-[#004E6A] focus:text-white transition-colors duration-300 outline-none"
      onClick={onAdd}
      tabIndex={0}
      aria-label={`Add ${item.title} to cart`}
    >
      Add
    </button>
  </div>
);

export default TreatProductCard;
