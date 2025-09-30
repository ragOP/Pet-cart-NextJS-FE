import React from "react";
import CustomImage from "@/components/images/CustomImage";
import { Trash2 } from "lucide-react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import CircularLoader from "../loaders/CircularLoader";
import { formatWeight } from "@/utils/formatWeight";

const CartItemMobile = ({ item, onQtyChange, onRemove, onNavigateToProduct, qtyChangeLoadingIds, deleteLoadingIds }) => {
  const isLoading = qtyChangeLoadingIds.includes(item?.variantId || item?.productId?._id);
  const isDeleting = deleteLoadingIds.includes(item?.variantId || item?.productId?._id);

  const discount = calculateDiscountPercent(item.productId?.price, item.productId?.salePrice);

  const productDetails = item?.productId;
  const productId = item?.productId?._id;
  const variantId = item?.variantId;

  return (
    <div className="bg-white rounded-xl p-3 flex gap-3 items-start border border-[#f59a10] w-full">
      {/* Image - Small and compact */}
      <div 
        className="w-30 h-30 cursor-pointer flex-shrink-0"
        onClick={() => onNavigateToProduct(productDetails?._id)}
      >
        <CustomImage
          src={productDetails?.images[0]}
          alt={productDetails?.title}
          className="w-full h-full object-contain rounded-lg bg-[#FFF7E6]"
        />
      </div>

      {/* Content - Takes remaining space */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Top row - Title and Trash */}
        <div className="flex justify-between items-start">
          <h2 className="text-sm font-medium text-gray-800 line-clamp-2 flex-1 pr-2">
            {productDetails?.title}
          </h2>
          <button
            onClick={() => {
              if(variantId){
                onRemove(productId, variantId);
              }else{
                onRemove(productId);
              }
            }}
            className="p-1 cursor-pointer rounded-full bg-white hover:bg-gray-100 text-gray-500 hover:text-red-500 flex-shrink-0"
          >
            {isDeleting ? <CircularLoader size={14} /> : <Trash2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Middle row - Quantity/Offer tag */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {item.quantity}x{formatWeight(productDetails?.weight)} | {discount}% OFF
          </div>
        </div>

        {/* Bottom row - Price and Quantity controls */}
        <div className="flex justify-between items-center">
          {/* Price section */}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#218032]">
              ₹{item.productId?.salePrice || item.productId?.price}
            </span>
            {item?.productId?.salePrice && (
              <span className="text-xs text-gray-500 line-through">
                MRP ₹{item?.productId?.price || 0}
              </span>
            )}
          </div>

          {/* Quantity controls */}
          <div className="flex items-center border border-[#f59a10] bg-[#004E6A05] rounded-[20px] overflow-hidden">
            <button
              onClick={() => onQtyChange(productId, variantId, -1)}
              disabled={isLoading}
              className="px-3 py-1 text-sm text-gray-700 border-r border-[#004E6A80] cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <div className="px-3 py-1 text-sm font-normal text-center min-w-[30px]">
              {isLoading ? <CircularLoader size={12} /> : <span>{item.quantity}</span>}
            </div>
            <button
              onClick={() => onQtyChange(productId, variantId, 1)}
              disabled={isLoading}
              className="px-3 py-1 text-sm text-gray-700 border-l border-[#004E6A80] cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemMobile;
