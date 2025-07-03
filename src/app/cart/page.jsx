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
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCookie } from "@/utils/cookies/getCookie";
import { getCart } from "@/app/apis/getCart";
import { addProductToCart } from "@/app/apis/addProductToCart";
import { getCoupons } from "@/app/apis/getCoupons";
import { validateCoupon } from "@/app/apis/validateCoupon";
import { toast } from "sonner";

// Dummy data for cart items
const cartItems = [
  {
    id: 1,
    title: "Royal Canin Maxi Adult Dry Dog Food",
    img: "/assets/cart1.png",
    subtitle: "14x3Kg | 10% OFF",
    price: 5000,
    salePrice: 4500,
    quantity: 2,
  },
  {
    id: 2,
    title: "Royal Canin Maxi Adult Dry Dog Food",
    img: "/assets/cart2.png",
    subtitle: "14x3Kg | 10% OFF",
    price: 5000,
    salePrice: 4500,
    quantity: 1,
  },
  {
    id: 3,
    title: "Royal Canin Maxi Adult Dry Dog Food",
    img: "/assets/cart2.png",
    subtitle: "14x3Kg | 10% OFF",
    price: 5000,
    salePrice: 4500,
    quantity: 1,
  },
];

const CartPage = () => {
  const [pincode, setPincode] = useState("");
  const [items, setItems] = useState(cartItems);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleQtyChange = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    select: (res) => res?.data || {},
  });

  const { data: couponsData } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getCoupons(),
    select: (res) => res?.data?.data || {},
  });

  // const { mutate: validateCouponMutation } = useMutation({
  //   mutationFn: validateCoupon,
  //   onSuccess: (data) => {
  //     toast.success("Coupon applied successfully");
  //     setAppliedCoupon(code)
  //   },
  //   onError: (error) => {
  //     toast.error(error.response.data.message);
  //   },
  // });

  // const handleApplyCoupon = (code) => {
  //   validateCouponMutation({ code });
  // };

    // Price calculation
    const totalPrice = cartData?.total_price || 0;
    const totalSalePrice = cartData?.items.reduce(
      (acc, item) => acc + (item.discounted_price || item.price) * item.quantity,
      0
    );
    const totalDiscount = totalPrice - totalSalePrice;
    const shipping = cartData?.shipping || 0;

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
          />
        </div>
        {/* Right: Summary */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-xl h-fit border border-[#F59A1133]">
          <PincodeInput
            pincode={pincode}
            onPincodeChange={setPincode}
            onCheckDelivery={() => {}}
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
            totalPrice={totalSalePrice}
            shipping={shipping}
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
