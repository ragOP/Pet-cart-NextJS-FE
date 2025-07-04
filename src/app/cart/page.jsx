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
import { deleteProductFromCart } from "@/app/apis/deleteProductFromCart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { extractTaxFromCart } from "@/utils/extract_tax_from_cart";


const CartPage = () => {
  const [pincode, setPincode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [qtyChangeLoadingIds, setQtyChangeLoadingIds] = useState([]);
  const [deleteLoadingIds, setDeleteLoadingIds] = useState([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    select: (res) => res?.data || {},
  });

  const { data: couponsData } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getCoupons(),
    select: (res) => res?.data?.data || {},
  });

  const { mutate: addToCart, isPending: addToCartPending } = useMutation({
    mutationFn: (payload) => addProductToCart(payload),
    onSuccess: (res) => {
      if (res?.success) {
        console.log(res)
        toast.success(res?.message || "Cart updated successfully");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        toast.error(res?.message || "Failed to add product to cart");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Request failed");
    },
  });

  // const { mutate: deleteProductFromCartMutation } = useMutation({
  //   mutationFn: deleteProductFromCart,
  //   onSuccess: () => {
  //     toast.success("Product removed from cart!");
  //     queryClient.invalidateQueries({ queryKey: ["cart"] });
  //   },
  //   onError: (error) => {
  //     toast.error(error.response?.data?.message || "Request failed");
  //   },
  // });

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

  const onNavigateToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  // Price calculation
  const totalPrice = cartData?.total_price || 0;
  const totalSalePrice = cartData?.items.reduce(
    (acc, item) => acc + (item.discounted_price || item.price) * item.quantity,
    0
  );
  const totalDiscount = totalPrice - totalSalePrice;
  const shipping = cartData?.shipping || 0;

  // Calculate tax
  const { totalCGST, totalSGST, totalIGST, totalCESS } = extractTaxFromCart(cartData?.items || []);

  // Calculate final price including tax
  const finalPayableAmount = totalSalePrice + totalCGST + totalSGST + totalIGST + totalCESS;

  return (
    <div className="bg-[#FFFBF6] min-h-screen w-full">
      <CartSavingsBanner savings={13.08} />
      <div className="flex flex-col lg:flex-row gap-8 mx-auto px-4 md:px-8 mt-6">
        {/* Left: Cart Items */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <CartList
            items={cartData?.items || []}
            onQtyChange={handleQtyChange}
            onRemove={handleRemove}
            onNavigateToProduct={onNavigateToProduct}
            isLoading={cartLoading}
            qtyChangeLoadingIds={qtyChangeLoadingIds}
            deleteLoadingIds={deleteLoadingIds}
          />

        </div>
        {/* Right: Summary */}
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
            onApply={setAppliedCoupon}
            onRemove={() => setAppliedCoupon(null)}
          />

          <div className="border-b border-[#0000001A]" />

          <CartSummary
            totalMrp={totalPrice}
            totalDiscount={totalDiscount}
            totalPrice={finalPayableAmount}
            shipping={shipping}
            taxBreakup={{ totalCGST, totalSGST, totalIGST, totalCESS }}
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
