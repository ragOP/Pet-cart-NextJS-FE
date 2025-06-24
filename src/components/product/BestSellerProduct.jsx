import React from "react";
import CustomImage from "@/components/images/CustomImage";
import { Heart } from "lucide-react";

const BestSellerProduct = ({
  product,
  onWishlist,
  onAddToCart,
  className = ""
}) => {
  return (
    <div className={`p-4 my-2 rounded-lg bg-white flex flex-col h-full group transition-all duration-200 ${className} hover:shadow-xl hover:scale-[1.025] hover:ring-2 hover:ring-[#F59A11] focus-within:shadow-xl focus-within:scale-[1.025] focus-within:ring-2 focus-within:ring-[#F59A11]`}> 
      {/* Product Image and Badge */}
      <div className="relative mb-3 flex items-center justify-center">
        <span className="absolute z-1 top-0 left-0 bg-gradient-to-r from-[#1C83A8] via-[#48BDE6] to-[#13789D] text-white text-xs font-bold px-2 py-0.5 rounded">
          BESTSELLER
        </span>
        <div className="w-full h-40 pt-3 rounded-lg overflow-hidden flex items-center justify-center bg-white">
          <CustomImage
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110 group-focus:scale-110"
            width={160}
            height={160}
          />
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center text-sm font-semibold text-black mb-1">
        <CustomImage
          src={product.starIcon}
          alt="Star"
          className="w-4 h-4 mr-1"
          width={16}
          height={16}
        />
        {product.rating}
      </div>

      {/* Name and Veg */}
      <div className="flex justify-between items-start mb-2">
        <p className="text-[13px] font-medium leading-tight w-[80%]">
          {product.name}
        </p>
        <CustomImage
          src={product.vegIcon}
          alt="Veg"
          className="w-4 h-6 mt-1"
          width={16}
          height={24}
        />
      </div>

      {/* Price and Discount */}
      <div className="flex justify-between items-center text-sm font-semibold">
        <div>
          <p className="text-[10px] text-gray-500">PRICE</p>
          <p className="text-[#218032] text-[15px] font-bold">₹{product.price}</p>
        </div>
        <span className="text-white text-[12px] px-2 py-0.5 rounded-md font-bold">
          <CustomImage
            src={product.offIcon}
            alt="Off"
            className="inline w-8 h-6"
            width={32}
            height={24}
          />
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-4">
        <button
          className="p-[0.35rem] flex items-center justify-center border-2 rounded-[8px] cursor-pointer transition-colors duration-150 hover:bg-[#fff6ea] focus:bg-[#fff6ea]"
          style={{ border: '2px solid var(--CANCELLED-COLOR, #F59A11)', borderRadius: '8px' }}
          onClick={onWishlist}
        >
          <Heart className="w-5 h-5 text-[#F59A11]" fill="none" strokeWidth={2.5} />
        </button>
        <button
          className="flex-1 bg-[#F59A11] hover:bg-[#e18a0e] focus:bg-[#e18a0e] text-white py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-sm hover:shadow-md focus:shadow-md"
          onClick={onAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default BestSellerProduct;
