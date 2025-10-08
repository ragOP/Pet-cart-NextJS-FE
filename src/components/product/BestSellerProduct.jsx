import React, { useState, useEffect } from "react";
import CustomImage from "@/components/images/CustomImage";
import { Heart, Star, ShoppingCart, Check } from "lucide-react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import ProductVariants from "./ProductVariants";
import { VariantBox } from "./Variants";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { addProductToCart } from "@/app/apis/addProductToCart";
import { getCart } from "@/app/apis/getCart";
import { toast } from "sonner";
import PawLoader from "../loaders/PawLoader";
import { useSelector } from "react-redux";
import { selectToken } from "@/store/authSlice";
import { useRouter } from "next/navigation";

const BestSellerProduct = ({
  product,
  className = "",
  onClick,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [buttonState, setButtonState] = useState('add'); // 'add', 'adding', 'added'
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;

  // Handle image hover
  const handleImageHover = (index) => {
    setSelectedImage(index);
  };

  const discount =
    calculateDiscountPercent(product.price, product.salePrice) || 0;

  const isOutStock = product.stock < 1 || product.variants?.some((variant) => variant.stock < 1);

  // Check if product is in cart
  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart({ params: {} }),
    select: (res) => res?.data || null,
    enabled: isLoggedIn, // Only fetch cart when user is logged in
  });

  const isProductInCart = cartData?.items?.some((item) => {
    return item.productId._id === product._id;
  });
  

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: (payload) => addProductToCart(payload),
    onSuccess: () => {
      setButtonState('added');
      setShowSuccess(true);
      toast.success("Product added to cart!", {
        position: "top-right",
        duration: 1500,
        autoClose: 1500,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Reset to "Go to Cart" after animation
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add product to cart", {
        position: "top-right",
        duration: 1500,
        autoClose: 1500,
      });
      setButtonState('add');
    },
  });

  const handleAddtoCart = (e) => {
    e.stopPropagation();
    
    // If button shows "GO TO CART", navigate to cart page
    if (buttonState === 'added') {
      router.push('/cart');
      return;
    }
    
    setButtonState('adding');
    addToCart({ productId: product._id, variantId: null, quantity: 1 });
  };

  useEffect(() => {
    if (!isProductInCart && buttonState === 'added' && !isPending) {
      setButtonState('add');
      setShowSuccess(false);
    }
  }, [isProductInCart, buttonState, isPending]);

  return (
    <div
      onClick={onClick}
      className={`p-3 sm:p-4 rounded-2xl sm:rounded-2xl bg-white shadow-xl flex flex-col group transition-all duration-200 ${className} border border-1 hover:border-[#f19813] relative w-full max-w-xs sm:max-w-sm h-[420px] sm:h-[520px]`}
    >
      {/* Product Image and Badge */}
      <div className="relative mb-2 sm:mb-4">
        {product.isBestSeller && <span className="absolute z-5 top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-[#1C83A8] via-[#48BDE6] to-[#13789D] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
          BESTSELLER
        </span>}
        {/* Expand/Fullscreen icons */}
        <div className="absolute z-5 top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2">
          <button className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>
        <div className="w-full h-40 sm:h-48 pt-6 sm:pt-8 pb-4 sm:pb-6 px-3 sm:px-4 rounded-lg relative bg-[#F6F6F6] border border-[#f19813]">
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
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1">
              <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-400 stroke-amber-400" />
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">
                {product.ratings.average.toFixed(1)}
              </span>
            </div>
          )}
          {/* Dots at bottom center */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full cursor-pointer ${index === selectedImage ? 'bg-[#F59A11]' : 'bg-gray-300'
                    }`}
                  onMouseEnter={() => handleImageHover(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Title and Veg Icon */}
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div className="flex-1 pr-2">
          <h3 className="text-xs sm:text-sm font-semibold leading-tight text-black mb-1 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-[#F59A11] font-bold text-xs sm:text-sm">
            {product.brandId?.name || 'Brand'}
          </p>
        </div>
        {product.isVeg === true && <div className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-green-600 rounded-sm bg-white ml-2">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-600 rounded-full"></div>
        </div>}
        {product.isVeg === false && <div className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-red-600 rounded-sm bg-white ml-2">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-600 rounded-full"></div>
        </div>}
      </div>

      {/* Variants */}
      <div className="flex-1 flex flex-col justify-center">
        <ProductVariants
          variants={[
            // Main product as first option
            {
              _id: 'main-product',
              productId: product._id,
              sku: product.sku,
              price: product.price,
              salePrice: product.salePrice,
              stock: product.stock,
              weight: product.weight,
              images: product.images,
              productLabel: product.productLabel,
              attributes: {
                'Size': 'Default'
              },
              isMainProduct: true
            },
            // Then add all variants
            ...(product.variants || [])
          ]}
          maxDisplay={9999}
          showDiscount={true}
          showAllSelected={true}
        />
      </div>

      {/* Price Section */}
      <div className="mb-3 sm:mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 mb-1">PRICE</p>
            <p className="text-[#218032] text-xl sm:text-2xl font-bold mb-1">
              ₹{product.salePrice || product.price}
            </p>
            {product.price !== product.salePrice && (
              <p className="text-gray-500 font-medium text-[10px] sm:text-xs">
                MRP <span className="line-through">₹{product.price}</span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-end mt-3 sm:mt-5">
            {discount > 0 && (
              <div className="relative bg-[#004E6A] text-white px-3 sm:px-5 py-0.5 sm:py-1 font-bold text-[10px] sm:text-xs mb-2 coupon-badge">
                {Math.round(discount)}% OFF
              </div>
            )}
            <div className="flex items-center text-[10px] sm:text-xs text-gray-600">
              <span className="text-[#f19813] mr-1">⚡</span>
              <span className="font-bold italic">17 OCT 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-auto">
        <button
          className={`w-full relative overflow-hidden text-white py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed min-h-[44px] touch-manipulation ${
            buttonState === 'adding'
              ? "bg-[#F59A11] cursor-not-allowed"
              : buttonState === 'added'
                ? "bg-[#F59A11] hover:bg-[#e18a0e]"
                : isOutStock
                  ? "bg-gray-400"
                  : "bg-[#F59A11] hover:bg-[#e18a0e]"
          }`}
          onClick={(e) => handleAddtoCart(e)}
          disabled={isPending || isOutStock}
        >
          {buttonState === 'adding' && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F59A11]">
              <div className="flex items-center gap-2">
                <PawLoader size={16} color="white" />
                <span className="text-white font-bold text-xs sm:text-sm">ADDING...</span>
              </div>
            </div>
          )}

          {buttonState === 'added' && showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F59A11] animate-pulse">
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-white animate-bounce" />
                <span className="text-white font-bold text-xs sm:text-sm">ADDED!</span>
              </div>
            </div>
          )}

          <div className={`flex items-center justify-center gap-1 transition-all duration-300 ${
            buttonState === 'adding' || (buttonState === 'added' && showSuccess) ? 'opacity-0' : 'opacity-100'
          }`}>
            {buttonState === 'added' && !showSuccess ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="text-xs sm:text-sm">GO TO CART</span>
              </>
            ) : isOutStock ? (
              <span className="text-xs sm:text-sm">OUT OF STOCK</span>
            ) : (
              <span className="text-xs sm:text-sm">ADD TO CART</span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default BestSellerProduct;
