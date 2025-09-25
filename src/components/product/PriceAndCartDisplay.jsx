import React, { useState } from "react";
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
      return item.productId._id === productId;
    }
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: (payload) => addProductToCart(payload),
    onSuccess: () => {
      toast.success("Product added to cart!", {
        duration: 1500,
        autoClose: 1500,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/cart");
      setLoading(false);
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
      try {
        const currentPath = window.location.pathname + window.location.search + window.location.hash;
        dispatch(setLoginRedirectUrl(currentPath));
      } catch (_) {}
      router.push("/");
      dispatch(openLoginPopup({}));
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
    <div className="flex flex-col gap-4 w-full bg-gray-100 rounded-lg p-4">
      {/* Price Section */}
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold">₹{salePrice || price || 0}</span>
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

      {/* Quantity Selector and Add to Cart Button */}
      <div className="flex items-center gap-4 sm:gap-8 lg:gap-12">
        {/* Quantity Selector */}
        {quantityVariant === "new" ? (
          // New Design - Orange border with clean layout
          <div className="flex items-center border border-[#f19813] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || loading}
              className="px-4 py-2 text-lg text-[#f19813] border-r border-gray-300 cursor-pointer hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <div className="px-4 py-2 text-base font-normal text-center min-w-[40px] border-r border-gray-300">
              {loading ? <CircularLoader size={16} /> : <span className="text-black">{quantity}</span>}
            </div>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= stock || loading}
              className="px-4 py-2 text-lg text-[#f19813] cursor-pointer hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        ) : (
          // Default Design - Original blue theme
          <div className="flex items-center border border-[#004E6A80] bg-[#004E6A05] rounded-[24px] overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || loading}
              className="pr-3 pl-5 py-1.5 text-lg text-gray-700 border-r border-[#004E6A80] cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <div className="px-4 py-1.5 text-base font-normal text-center min-w-[40px]">
              {loading ? <CircularLoader size={16} /> : <span>{quantity}</span>}
            </div>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= stock || loading}
              className="pr-5 pl-3 py-1.5 text-lg text-gray-700 border-l border-[#004E6A80] cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading || isProductInCart || stock <= 0}
          className={`min-w-fit ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : isProductInCart
              ? "bg-[#f19813] hover:bg-[#d9820a] cursor-not-allowed"
              : stock > 0
              ? "bg-[#f19813] hover:bg-[#d9820a]"
              : "bg-gray-400 cursor-not-allowed"
          } whitespace-nowrap text-white font-bold py-2 px-8 rounded-lg text-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f19813]`}
        >
          {loading
            ? "ADDING..."
            : isProductInCart
            ? "ADDED"
            : stock > 0
            ? "ADD TO CART"
            : "OUT OF STOCK"}
        </button>
      </div>
    </div>
  );
};

export default PriceAndCartDisplay;
