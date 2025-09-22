import React from "react";
import CustomImage from "@/components/images/CustomImage";
import { Heart, Star } from "lucide-react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import { VariantBox } from "./Variants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "@/app/apis/addProductToCart";
import { toast } from "sonner";

const BestSellerProduct = ({
  product,
  className = "",
  onClick,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const queryClient = useQueryClient();

  // Handle image hover
  const handleImageHover = (index) => {
    setSelectedImage(index);
  };

  const discount =
    calculateDiscountPercent(product.price, product.salePrice) || 0;

  const isOutStock = product.stock < 1 || product.variants?.some((variant) => variant.stock < 1);

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: (payload) => addProductToCart(payload),
    onSuccess: (res) => {
      if(res?.success){
        toast.success("Product added to cart!", {
          position: "top-right",
          duration: 1500,
          autoClose: 1500,
        });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else{
        toast.error(res?.message || "Failed to add product to cart", {
          position: "top-right",
          duration: 1500,
          autoClose: 1500,
        });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add product to cart", {
        position: "top-right",
        duration: 1500,
        autoClose: 1500,
      });
    },
  });

  const handleAddtoCart = (e) => {
    e.stopPropagation();
    addToCart({ productId: product._id, variantId: null, quantity: 1 });
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-3xl bg-white flex flex-col group transition-all duration-200 ${className} hover:shadow-lg border-3 border-[#F59A11] relative max-w-sm`}
      style={{ borderWidth: '3px', borderColor: '#F59A11' }}
    >
      {/* Product Image and Badge */}
      <div className="relative mb-4">
        <span className="absolute z-10 top-3 left-3 bg-gradient-to-r from-[#1C83A8] via-[#48BDE6] to-[#13789D] text-white text-xs font-bold px-2 py-1 rounded">
          BESTSELLER
        </span>
        {/* Expand/Fullscreen icons */}
        <div className="absolute z-10 top-3 right-3 flex flex-col gap-2">
          <button className="w-7 h-7 bg-white rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="w-7 h-7 bg-white rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>
        <div className="w-full h-64 pt-8 pb-6 px-4 rounded-lg relative bg-[#F6F6F6]">
          <CustomImage
            key={selectedImage}
            src={product.images[selectedImage]}
            alt={product.title}
            className="w-full h-full object-contain"
            width={200}
            height={200}
          />
          {/* Rating at bottom left */}
          {product.ratings?.average > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
              <span className="text-xs font-medium text-gray-700">
                {product.ratings.average.toFixed(1)}
              </span>
            </div>
          )}
          {/* Dots at bottom center */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    index === selectedImage ? 'bg-[#F59A11]' : 'bg-gray-300'
                  }`}
                  onMouseEnter={() => handleImageHover(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Title and Veg Icon */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-2">
          <h3 className="text-sm font-semibold leading-tight text-black mb-1">
            {(() => {
              if (product.title.length <= 40) {
                return product.title;
              }
              return product.title.slice(0, 40) + '...';
            })()}
          </h3>
          <p className="text-[#F59A11] font-bold text-sm">
            {product.brandId?.name || 'Brand'}
          </p>
        </div>
        <div className="flex items-center justify-center w-4 h-4 border-2 border-green-600 rounded-sm bg-white ml-2">
          <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
        </div>
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {product.variants.slice(0, 3).map((variant, index) => {
            const variantDiscount = calculateDiscountPercent(variant.price, variant.salePrice) || 0;
            return (
              <div key={index} className="rounded border border-[#004E6A] overflow-hidden bg-white">
                <div className="bg-[#004E6A] text-white text-center py-0.5 px-1">
                  <div className="text-[8px] font-medium">
                    10KG (2x5KG)
                  </div>
                </div>
                <div className="bg-white text-center py-0.5 px-1">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-[8px] font-bold text-[#004E6A]">₹ {variant.salePrice || variant.price}</span>
                    {variantDiscount > 0 && (
                      <span className="text-[7px] text-green-600 font-bold">{Math.round(variantDiscount)}% OFF</span>
                    )}
                  </div>
                  {variant.price !== variant.salePrice && (
                    <div className="text-[7px] text-gray-500 line-through">MRP {variant.price}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Price Section */}
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-[10px] font-medium text-gray-500 mb-1">PRICE</p>
            <p className="text-[#218032] text-2xl font-bold mb-1">
              ₹{product.salePrice || product.price}
            </p>
            {product.price !== product.salePrice && (
              <p className="text-gray-500 font-medium text-xs">
                MRP <span className="line-through">₹{product.price}</span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            {discount > 0 && (
              <div className="bg-[#004E6A] text-white px-2 py-0.5 rounded font-bold text-xs mb-2">
                {Math.round(discount)}% OFF
              </div>
            )}
              <div className="flex items-center text-[10px] text-gray-600">
                <span className="text-yellow-500 mr-1">⚡</span>
                <span className="font-medium italic">17 OCT 2025</span>
              </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-[#F59A11] hover:bg-[#e18a0e] text-white py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={(e) => handleAddtoCart(e)}
        disabled={isPending || isOutStock}
      >
        {isPending ? "ADDING..." : (isOutStock ? "OUT OF STOCK" : "ADD TO CART")}
      </button>
    </div>
  );
};

export default BestSellerProduct;
