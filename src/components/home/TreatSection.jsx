"use client";

import React from "react";
import discountLogo from "@/assets/treats/discount.png";
import treat1 from "@/assets/treats/treat1.png";
import treat2 from "@/assets/treats/treat2.png";
import treat3 from "@/assets/treats/treat3.png";
import treat4 from "@/assets/treats/treat4.png";
import CustomImage from "@/components/images/CustomImage";

const treats = [
  { id: 1, image: treat1, name: "Chicken Sticks", price: 999, oldPrice: 1159 },
  { id: 2, image: treat2, name: "Chicken Sticks", price: 999, oldPrice: 1159 },
  { id: 3, image: treat3, name: "Chicken Sticks", price: 999, oldPrice: 1159 },
  { id: 4, image: treat4, name: "Chicken Sticks", price: 999, oldPrice: 1159 },
];

const TreatProductCard = ({ item, onAdd }) => (
  <div className="group flex flex-col items-center rounded-xl p-2 transition-all duration-200 hover:scale-105 focus-within:scale-105 cursor-pointer bg-transparent">
    <div className="relative">
      <div className="w-32 h-40 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
        <CustomImage
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 px-2 py-1 align-center">
        <CustomImage
          src={discountLogo}
          alt="Discount"
          className="w-25 h-6 align-center inline-block"
        />
      </span>
    </div>
    <p className="mt-2 text-sm font-medium text-center text-[#181818]">
      {item.name}
    </p>
    <div className="mt-1 text-center text-sm font-semibold flex items-baseline justify-center gap-1">
      <span className="text-[16px] text-[#181818] font-bold">₹</span>
      <span className="text-[24px] text-[#181818] font-bold">{item.price}</span>
      <span className="flex items-baseline line-through text-gray-500 font-normal ml-1">
        <span className="text-[16px]">₹</span>
        <span className="text-[18px]">{item.oldPrice}</span>
      </span>
    </div>
    <button
      className="w-30 mt-2 border-2 border-[#004E6A] text-[#004E6A] py-1 rounded-md font-semibold md:w-35 md:h-10 hover:bg-[#004E6A] hover:text-white focus:bg-[#004E6A] focus:text-white transition-colors duration-300 outline-none"
      onClick={onAdd}
      tabIndex={0}
      aria-label={`Add ${item.name} to cart`}
    >
      Add
    </button>
  </div>
);

const TreatSection = () => {
  return (
    <div className="bg-[#FFF2809E] p-4 md:py-6 md:pl-8 rounded-2xl mt-6 flex flex-col md:flex-row justify-between gap-6 m-4">
      {/* Left: Text & CTA */}
      <div className="flex-1 max-w-md  justify-between">
        <h2 className="text-[40px] font-bold text-[#814E00] leading-tight font-holtwood uppercase">
          JUST TREATS. BAKED <br /> TO BE REAL.
        </h2>
        <p className="text-[25px] text-black mt-2">
          {" "}
          more protein, more crunch, more taste
        </p>
        <button
          className="bg-[#F59A11] text-white text-lg font-semibold mt-12 px-6 py-2 rounded-xl md:w-45 md:h-15 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg outline-none"
          onClick={() => {
            console.log("Shop now clicked");
          }}
          tabIndex={0}
          aria-label="Shop now"
        >
          Shop now
        </button>
      </div>

      {/* Right: Product Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
        {treats.map((item) => (
          <TreatProductCard
            key={item.id}
            item={item}
            onAdd={() => {
              // Placeholder: add to cart logic or toast
              console.log(`Added ${item.name} to cart`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TreatSection;
