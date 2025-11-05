import React, { useState, useEffect } from "react";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { addProductToCart } from "@/app/apis/addProductToCart";
import { toast } from "sonner";
import { getCart } from "@/app/apis/getCart";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "@/store/authSlice";
import { openLoginPopup, setLoginRedirectUrl } from "@/store/uiSlice";
import CircularLoader from "../loaders/CircularLoader";
import PawLoader from "../loaders/PawLoader";
import { ShoppingCart, Check, Plus, Heart } from "lucide-react";

const PriceAndCartDisplay = ({
  price,
  salePrice,
  productId,
  variantId = null,
  quantity: initialQuantity = 1,
  stock = 0,
  quantityVariant = "default", // "default" or "new"
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart({ params: {} }),
    select: (res) => res?.data || null,
    enabled: isLoggedIn, // Only fetch cart when user is logged in
  });

  const isProductInCart = cartData?.items?.some((item) => {
    if (variantId) {
      return item.variantId === variantId;
    } else {
      // Handle both cases: productId might be an object or a string
      const cartProductId = item?.productId?._id || item?.productId;
      return cartProductId === productId;
    }
  });


  const { mutate: addToCart } = useMutation({
    mutationFn: (payload) => addProductToCart(payload),
    onSuccess: () => {
      setShowSuccess(true);
      toast.success("Product added to cart!", {
        duration: 1500,
        autoClose: 1500,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setLoading(false);

      // Hide success animation after 1 second
      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to add product to cart",
        {
          duration: 1500,
          autoClose: 1500,
        }
      );
      setLoading(false);
    },
  });
  const discount = calculateDiscountPercent(price, salePrice);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add products to cart", {
        duration: 1500,
        autoClose: 1500,
      });
      // Navigate to cart - RequireAuth will handle showing login popup
      router.push("/cart");
      return;
    }

    if (isProductInCart) {
      router.push("/cart");
      return;
    }

    setLoading(true);
    if (variantId) {
      addToCart({ variantId, productId, quantity });
    } else {
      addToCart({ productId, variantId: null, quantity });
    }
  };
  return (
    <div className="flex flex-col border border-gray-200 gap-4 w-full shadow-sm rounded-lg p-4">

      {/* Price Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-3xl font-bold mb-1">₹{salePrice || price || 0}</span>
          {salePrice && (
            <div className="flex items-center gap-2">
              <span className="text-xl text-gray-600 font-normal">
                MRP{" "}
                <span className="text-xl text-gray-500 line-through font-normal">
                  ₹{price || 0}
                </span>
              </span>
              <span className="text-[#218032] text-xl font-normal">
                ({discount || 0}% Off)
              </span>
            </div>
          )}
          <p className="text-sm text-[#0888B1]">incl. of all taxes</p>
        </div>

        {/* Add to Cart Button - Desktop: inline, Mobile: full width on new line */}
        <div className="flex flex-col justify-end md:max-w-none">
          <button
            onClick={handleAddToCart}
            disabled={loading || stock <= 0}
            className={`w-full md:w-auto md:min-w-fit relative overflow-hidden ${stock <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#f19813] hover:bg-[#d9820a]"
              } whitespace-nowrap text-white font-bold py-3 md:py-2 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f19813] transform hover:scale-105 active:scale-95`}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f19813]">
                <div className="flex items-center gap-3">
                  <PawLoader size={24} color="white" />
                  <span className="text-white font-bold">ADDING...</span>
                </div>
              </div>
            )}

            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f19813] animate-pulse">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-white animate-bounce" />
                  <span className="text-white font-bold">ADDED!</span>
                </div>
              </div>
            )}

            <div className={`flex items-center justify-center md:justify-start gap-2 transition-all duration-300 ${loading || showSuccess ? 'opacity-0' : 'opacity-100'}`}>
              {isProductInCart ? (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>GO TO CART</span>
                </>
              ) : stock > 0 ? (
                <>
                  <span>ADD TO CART</span>
                </>
              ) : (
                <span>OUT OF STOCK</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceAndCartDisplay;
