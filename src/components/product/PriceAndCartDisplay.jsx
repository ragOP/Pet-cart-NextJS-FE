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

const PriceAndCartDisplay = ({
  price,
  salePrice,
  productId,
  variantId = null,
  quantity = 1,
  stock = 0,
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
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
      toast.success("Product added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/cart");
      setLoading(false);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to add product to cart"
      );
      setLoading(false);
    },
  });
  const discount = calculateDiscountPercent(price, salePrice);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add products to cart");
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
    <div className="flex flex-col md:flex-row gap-4 w-full justify-between md:pr-4">
      <div className="flex flex-col gap w-full md:w-1/2">
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

      <button
        onClick={handleAddToCart}
        disabled={loading || isProductInCart || stock <= 0}
        className={`w-full md:w-fit h-fit ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : isProductInCart
            ? "bg-yellow-600 hover:bg-yellow-500 cursor-not-allowed"
            : stock > 0
            ? "bg-[#F59A11] hover:bg-[#D9820A]"
            : "bg-gray-400 cursor-not-allowed"
        } text-white font-bold py-3 px-10 rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D9820A]`}
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
  );
};

export default PriceAndCartDisplay;
