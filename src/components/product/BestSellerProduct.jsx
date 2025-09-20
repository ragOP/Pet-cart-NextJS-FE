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
      className={`p-2 my-2 rounded-lg bg-white flex flex-col h-[30rem] group transition-all duration-200 ${className} hover:shadow-xl hover:scale-[1.025] hover:ring-2 hover:ring-[#F59A11] focus-within:shadow-xl focus-within:scale-[1.025] focus-within:ring-2 focus-within:ring-[#F59A11] justify-between`}
    >
      {/* Product Image and Badge */}
      <div className="relative mb-3 flex items-center justify-center">
        <span className="absolute z-1 top-0 left-0 bg-gradient-to-r from-[#1C83A8] via-[#48BDE6] to-[#13789D] text-white text-xs font-bold px-2 py-0.5 rounded">
          BESTSELLER
        </span>
        <div className="w-full h-48 pt-4 pb-8 px-4 rounded-lg overflow-hidden relative bg-[#F6F6F6]">
          <CustomImage
            key={selectedImage}
            src={product.images[selectedImage]}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110 group-focus:scale-110"
            width={160}
            height={160}
          />
          {/* Centered Dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedImage === index
                    ? "bg-[#F59A11]"
                    : "bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
          {/* Rating */}
          <div className="absolute bottom-1 left-2 flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
            <span className="mt-[2px] text-xs">
              {(product.rating || 1).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Name and Veg */}
      <div className="flex justify-between items-start mb-2">
        <div className="space-y-1">
          <p className="text-[13px] font-medium leading-tight w-[80%] line-clamp-3 display-webkit-box webkit-line-clamp-3 webkit-box-orient-vertical overflow-hidden">
            {product.title}
          </p>
          <p className="text-[13px] text-[#6A6868] font-medium leading-tight w-full">
            {product.brandId?.name}
          </p>
        </div>

        <CustomImage
          src={product.vegIcon}
          alt="Veg"
          className="w-4 h-6 mt-1"
          width={16}
          height={24}
        />
      </div>

      {product.variants && product.variants.length > 0 && (
        <div className="flex flex-row flex-wrap items-center">
          {product.variants.map((variant) => (
            // <div
            //   key={variant._id || variant.id}
            //   className="inline-block px-3 py-1 text-sm rounded-lg bg-[#E3EBEE] text-gray-700 font-semibold mt-2 mb-2 mr-2"
            // >
            //   {variant.subtitle}
            // </div>
            // <VariantBox
            //   key={variant._id || variant.id}
            //   variant={variant}
            //   onSelectVariant={(variantId) => onSelectVariant(variantId)}
            //   discount={calculateDiscountPercent(
            //     variant.price,
            //     variant.salePrice
            //   )}
            // />
            <span
              key={variant._id || variant.id}
              className="inline-block px-3 py-1 text-[10px] rounded-lg bg-[#E3EBEE] text-[#181818] font-medium mr-2"
            >
              <span>{variant.weight > 1000 ? `${(variant.weight / 1000) % 1 === 0 ? (variant.weight / 1000) : (variant.weight / 1000).toFixed(2)}kg` : `${variant.weight % 1 === 0 ? variant.weight : variant.weight.toFixed(2)}g`}</span>{" "}
              <span>{variant.salePrice ? `| ${calculateDiscountPercent(variant.price, variant.salePrice)}% OFF` : null}</span>
            </span>
          ))}
        </div>
      )}

      {/* Price and Discount */}
      <div className="flex justify-between items-center text-sm font-semibold">
        <div>
          <p className="text-xs font-normal text-gray-500">PRICE</p>
          <p className="text-[#218032] text-[18px] font-bold">
            ₹{product?.salePrice || product.price}
          </p>
          <span className="text-gray-500 font-normal">
            MRP <span className="line-through"> ₹{product.price}</span>
          </span>
        </div>

        <div className="flex flex-col justify-end items-end">
          {discount > 0 && (
            <span className="text-[12px] flex justify-end px-2 py-0.5 rounded-md font-bold">
              {`${discount || 0}% OFF`}
            </span>
          )}
          <span className="text-xs font-normal text-black italic">FRIDAY, 13th JUNE</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-4">
        {/* <button
          className="p-[0.35rem] flex items-center justify-center border-2 rounded-[8px] cursor-pointer transition-colors duration-150 hover:bg-[#fff6ea] focus:bg-[#fff6ea]"
          style={{
            border: "2px solid var(--CANCELLED-COLOR, #F59A11)",
            borderRadius: "8px",
          }}
          onClick={onWishlist}
        >
          <Heart
            className="w-5 h-5 text-[#F59A11]"
            fill="none"
            strokeWidth={2.5}
          />
        </button> */}
        <button
          className="flex-1 bg-[#F59A11] hover:bg-[#e18a0e] focus:bg-[#e18a0e] text-white py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-sm hover:shadow-md focus:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={(e) => handleAddtoCart(e)}
          disabled={isPending || isOutStock}
        >
          {isPending ? "ADDING..." : (isOutStock ? "OUT OF STOCK" : "ADD TO CART")}
        </button>
      </div>
    </div>
  );
};

export default BestSellerProduct;
