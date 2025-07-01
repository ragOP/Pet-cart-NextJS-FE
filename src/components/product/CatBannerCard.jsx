import React from "react";
import CustomImage from "@/components/images/CustomImage";

const CatBannerCard = ({ image, title, onClick }) => {
  return (
    <div
      className="flex flex-col p-2 items-start justify-between just rounded-lg overflow-hidden group transition-all duration-200 cursor-pointer hover:shadow-xl hover:scale-[1.025] hover:ring-2 hover:ring-[#F59A11] focus-within:shadow-xl focus-within:scale-[1.025] focus-within:ring-2 focus-within:ring-[#F59A11]"
      tabIndex={0}
      onClick={onClick}
    >
      <CustomImage
        src={image}
        alt={title}
        className="w-full object-cover rounded-lg group-hover:brightness-95 group-hover:scale-105 transition-transform duration-200"
        width={300}
        height={200}
      />
      <div className="mt-2 px-1">
        <p className="text-base font-semibold text-[#181818]">{title}</p>
      </div>
    </div>
  );
};

export default CatBannerCard;
