import React from "react";
import CustomImage from "@/components/images/CustomImage";
import { Trash2 } from "lucide-react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import CircularLoader from "../loaders/CircularLoader";

const CartItem = ({ item, onQtyChange, onRemove, onNavigateToProduct, qtyChangeLoadingIds, deleteLoadingIds }) => {
  const isLoading = qtyChangeLoadingIds.includes(item?.variantId || item?.productId?._id);
  const isDeleting = deleteLoadingIds.includes(item?.variantId || item?.productId?._id);

  // Use variant data if variantId is present, otherwise use main product data
  const isVariant = item?.variantId;
  const productDetails = isVariant ? item?.variantId : item?.productId;
  const productId = item?.productId?._id;
  const variantId = item?.variantId;
  
  // Calculate discount based on variant or main product pricing
  const originalPrice = isVariant ? item?.variantId?.price : item?.productId?.price;
  const salePrice = isVariant ? item?.variantId?.salePrice : item?.productId?.salePrice;
  const discount = calculateDiscountPercent(originalPrice, salePrice);
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start border border-[#f59a10] w-full">
      {/* Image - Full width on mobile, normal on desktop */}
      <div className="w-full sm:w-36 aspect-square sm:aspect-auto cursor-pointer"
      onClick={() => onNavigateToProduct(item?.productId?._id)}>
        <CustomImage
          src={productDetails?.images?.[0] || item?.productId?.images?.[0]}
          alt={productDetails?.variant_name || productDetails?.variantName || productDetails?.title}
          className="w-full h-full sm:w-36 object-contain rounded-lg bg-[#FFF7E6]"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between self-stretch w-full">
        {/* Top section */}
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-2">
            <h2 className="text-[18px] sm:text-[20px] font-normal text-gray-800 line-height-[1.4]">
              {isVariant ? item?.productId?.title : productDetails?.title}
            </h2>
            {isVariant && (
              <div className="inline-block px-3 py-1 text-sm rounded-lg bg-[#E3EBEE] text-gray-700 font-semibold mt-2 mb-2">
                {productDetails?.variant_name || productDetails?.variantName}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              if(variantId){
                onRemove(productId, variantId);
              }else{
                onRemove(productId);
              }
            }}
            className="p-2 cursor-pointer rounded-full bg-white hover:bg-gray-100 text-gray-500 hover:text-red-500 flex-shrink-0"
          >
            {isDeleting ? <CircularLoader size={16} /> : <Trash2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Bottom section - Price and Quantity */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-2 mt-2 sm:mt-0">
          {/* Price section */}
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#218032]">
              ₹{salePrice || originalPrice}
            </span>
            {salePrice && salePrice < originalPrice && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600 font-normal">
                  MRP{" "}
                  <span className="text-gray-500 line-through">
                    ₹{originalPrice || 0}
                  </span>
                </span>
                <span className="text-[#218032] text-sm font-normal">
                  ({discount || 0}% Off)
                </span>
              </div>
            )}
          </div>

          {/* Quantity controls */}
          <div className="flex items-center border border-[#f59a10] bg-[#004E6A05] rounded-[24px] overflow-hidden self-end">
            <button
              onClick={() => onQtyChange(productId, variantId, -1)}
              disabled={isLoading}
              className="pr-3 pl-5 py-1 text-lg text-gray-700 border-r border-[#004E6A80] cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <div className="px-4 py-1 text-base font-normal text-center min-w-[40px]">
              {isLoading ? <CircularLoader size={16} /> : <span>{item.quantity}</span>}
            </div>
            <button
              onClick={() => onQtyChange(productId, variantId, 1)}
              disabled={isLoading}
              className="pr-5 pl-3 py-1 text-lg text-gray-700 border-l border-[#004E6A80] cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
