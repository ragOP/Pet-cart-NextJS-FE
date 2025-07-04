"use client";

import React, { useState } from "react";
import CartSavingsBanner from "@/components/cart/CartSavingsBanner";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import CartCouponSection from "@/components/cart/CartCouponSection";
import PincodeInput from "@/components/pincode/PincodeInput";
import SpecialDeals from "@/components/cart/SpecialDeals";
import LastMinuteAddOns from "@/components/cart/LastMinuteAddOns";
import CategoryBanner from "@/components/category/CategoryBanner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart } from "@/app/apis/getCart";
import { addProductToCart } from "@/app/apis/addProductToCart";
import { getCoupons } from "@/app/apis/getCoupons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookies/getCookie";

const CartPage = () => {
  const [pincode, setPincode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [qtyChangeLoadingIds, setQtyChangeLoadingIds] = useState([]);
  const [deleteLoadingIds, setDeleteLoadingIds] = useState([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [params, setParams] = useState({
    address_id: getCookie("addressId"),
    coupon_id: appliedCoupon,
  });

  const { data: cartData, isLoading: cartLoading, isError: cartError } = useQuery({
    queryKey: ["cart", params],
    queryFn: () => getCart({ params }),
    select: (res) => res?.data || null,
  });

  const { data: couponsData } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getCoupons(),
    select: (res) => res?.data?.data || [],
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: (payload) => addProductToCart(payload),
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message || "Cart updated successfully");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        toast.error(res?.message || "Failed to update cart");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Request failed");
    },
  });

  const handleQtyChange = (productId, variantId, quantity) => {
    const id = variantId || productId;
    setQtyChangeLoadingIds((prev) => [...prev, id]);

    const prevQty = cartData?.items?.find(
      (item) => (variantId ? item.variantId === variantId : item.productId._id === productId)
    )?.quantity || 0;

    const newQty = prevQty + quantity;

    addToCart(
      { productId, variantId, quantity: newQty },
      {
        onSettled: () => {
          setQtyChangeLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
        },
      }
    );
  };

  const handleRemove = (productId, variantId) => {
    const id = variantId || productId;
    setDeleteLoadingIds((prev) => [...prev, id]);

    addToCart(
      { productId, variantId, quantity: 0 },
      {
        onSettled: () => {
          setDeleteLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
        },
      }
    );
  };

  const handleApplyCoupon = (couponId) => {
    setAppliedCoupon(couponId);
    setParams((prev) => ({ ...prev, coupon_id: couponId }));
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setParams((prev) => ({ ...prev, coupon_id: null }));
  };

  const onNavigateToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const totalPrice = cartData?.items?.reduce((acc, item) => acc + item.total, 0) || 0;
  const discountPrice = cartData?.items?.reduce((acc, item) => acc + item.discount_price, 0) || 0;
  const shipping = cartData?.shipping || 0;
  const finalPayableAmount = cartData?.total_price || 0;
  // const couponDiscount = Math.max(finalPayableAmount - discountPrice, 0);

  const { cgst, sgst, igst, cess } = cartData?.items?.reduce(
    (acc, item) => {
      acc.cgst += item.cgst || 0;
      acc.sgst += item.sgst || 0;
      acc.igst += item.igst || 0;
      acc.cess += item.cess || 0;
      return acc;
    },
    { cgst: 0, sgst: 0, igst: 0, cess: 0 }
  ) || { cgst: 0, sgst: 0, igst: 0, cess: 0 };

  const couponDiscount = Math.max((totalPrice + cgst + sgst + igst + cess) - finalPayableAmount, 0);

  return (
    <div className="bg-[#FFFBF6] min-h-screen w-full">
      {cartData && !cartLoading ? (
        <CartSavingsBanner savings={couponDiscount.toFixed(2)} />
      ) : (
        <div className="h-16 bg-white rounded-lg shadow-sm animate-pulse" />
      )}

      <div className="flex flex-col lg:flex-row gap-8 mx-auto px-4 md:px-8 mt-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {cartLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : cartError ? (
            <div className="text-center text-red-500 py-4">
              Failed to load cart data. Please try refreshing the page.
            </div>
          ) : (
            <CartList
              items={cartData?.items || []}
              onQtyChange={handleQtyChange}
              onRemove={handleRemove}
              onNavigateToProduct={onNavigateToProduct}
              isLoading={cartLoading}
              qtyChangeLoadingIds={qtyChangeLoadingIds}
              deleteLoadingIds={deleteLoadingIds}
            />
          )}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-xl h-fit border border-[#F59A1133]">
          <PincodeInput
            pincode={pincode}
            onPincodeChange={setPincode}
            onCheckDelivery={() => { }}
            className={"m-4"}
          />

          <div className="border-b border-[#0000001A]" />

          <CartCouponSection
            coupons={couponsData || []}
            appliedCoupon={appliedCoupon}
            onApply={handleApplyCoupon}
            onRemove={handleRemoveCoupon}
          />

          <div className="border-b border-[#0000001A]" />

          <CartSummary
            totalMrp={totalPrice}
            totalPrice={finalPayableAmount}
            shipping={shipping}
            taxBreakup={{ cgst, sgst, igst, cess }}
            couponDiscount={couponDiscount}
          />
        </div>
      </div>

      <SpecialDeals />
      <div className="px-4 mb-2">
        <CategoryBanner />
      </div>
      <LastMinuteAddOns />
    </div>
  );
};

export default CartPage;
