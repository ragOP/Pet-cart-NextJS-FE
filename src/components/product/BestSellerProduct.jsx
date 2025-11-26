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
import ProductVegIcon from "@/icons/ProductVegIcon";
import ProductNonVegIcon from "@/icons/ProductNonVegIcon";
import QuickView from "./QuickView";
import { formatPrice } from "@/utils/formatPrice";

const BestSellerProduct = ({
  product,
  className = "",
  onClick,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [buttonState, setButtonState] = useState('add');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
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

    // If not logged in, save to localStorage and navigate to cart
    if (!isLoggedIn) {
      try {
        const pendingCartItems = JSON.parse(localStorage.getItem('pendingCartItems') || '[]');
        const cartItem = {
          productId: product._id,
          variantId: null,
          quantity: 1,
          product: product // Store full product data for reference
        };

        // Check if product already exists in pending cart
        const existingIndex = pendingCartItems.findIndex(
          item => item.productId === product._id && item.variantId === null
        );

        if (existingIndex >= 0) {
          // Update quantity if exists
          pendingCartItems[existingIndex].quantity += 1;
        } else {
          // Add new item
          pendingCartItems.push(cartItem);
        }

        localStorage.setItem('pendingCartItems', JSON.stringify(pendingCartItems));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }

      // Navigate to cart page - RequireAuth will handle showing login
      router.push('/cart');
      return;
    }

    // If logged in, add to cart normally
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
      className={`p-3 sm:p-4 rounded-2xl sm:rounded-2xl bg-white shadow-xl flex flex-col group transition-all duration-200 border border-1 hover:border-[#f19813] relative ${className}`}
    >
      {/* Product Image and Badge */}
      <div className="relative mb-2 sm:mb-4">
        {product.isBestSeller && <span className="absolute z-5 top-2 sm:top-2 left-2 sm:left-2 bg-gradient-to-r from-[#1C83A8] via-[#48BDE6] to-[#13789D] text-white text-[12px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
          BESTSELLER
        </span>}
        {/* Expand/Fullscreen icons */}
        <div className="absolute z-5 top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickView(true);
            }}
            className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          {/* <button className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button> */}
        </div>
        <div className="w-full h-60 sm:h-64 rounded-lg relative bg-white border border-[#f19813]">
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

      {/* Variants */}
      <div className="mb-1">
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
          maxDisplay={2}
          showDiscount={true}
          showAllSelected={true}
          onMoreClick={(e) => {
            setShowQuickView(true);
          }}
        />
      </div>

      {/* Price Section */}
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="text-[#218032] text-xl sm:text-2xl font-bold">
              ₹{formatPrice(product.salePrice || product.price)}
            </p>
            {product.price !== product.salePrice && (
              <p className="text-[#000] text-[11px] sm:text-[11px] -mt-1">
                MRP <span className="line-through text-gray-500">₹{formatPrice(product.price)}</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {product.isVeg === true && <ProductVegIcon />}
            {product.isVeg === false && <ProductNonVegIcon />}
          </div>
        </div>
      </div>

      {/* Brand Name */}
      <div className="mb-1">
        <p className="text-[#F59A11] font-bold text-xs sm:text-sm">
          {product.brandId?.name || 'Brand'}
        </p>
      </div>

      {/* Product Title */}
      <div className="mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-semibold leading-tight text-black line-clamp-2">
          {product.title}
        </h3>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-auto">
        <button
          className={`w-full relative overflow-hidden text-white py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed min-h-[44px] touch-manipulation ${buttonState === 'adding'
              ? "bg-[#F59A11] cursor-not-allowed"
              : buttonState === 'added'
                ? "bg-[#F59A11] hover:bg-[#e18a0e]"
                : isOutStock
                  ? "bg-gray-400"
                    : "bg-[#F59A11] hover:bg-[#e18a0e]"
             } rounded-lg`}
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

          <div className={`flex items-center justify-center gap-1 transition-all duration-300 ${buttonState === 'adding' || (buttonState === 'added' && showSuccess) ? 'opacity-0' : 'opacity-100'
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

      {/* Quick View Modal */}
      <QuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </div>
  );
};

export default BestSellerProduct;
