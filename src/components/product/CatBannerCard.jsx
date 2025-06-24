import React from "react";
import CustomImage from "@/components/images/CustomImage";

const CatBannerCard = ({ image, title, link }) => {
  return (
    <div
      className="flex flex-col p-2 items-start justify-between just rounded-lg overflow-hidden group transition-all duration-200 cursor-pointer hover:shadow-xl hover:scale-[1.025] hover:ring-2 hover:ring-[#F59A11] focus-within:shadow-xl focus-within:scale-[1.025] focus-within:ring-2 focus-within:ring-[#F59A11]"
      tabIndex={0}
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
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#181818] mt-1 transition-colors cursor-pointer hover:text-[#F59A11] focus:text-[#F59A11] hover:underline focus:underline outline-none"
          tabIndex={0}
          aria-label="Shop Now"
        >
          Shop Now &gt;
        </a>
      </div>
    </div>
  );
};

export default CatBannerCard;
