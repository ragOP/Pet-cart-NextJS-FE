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

  // Price calculation
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalSalePrice = items.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
    0
  );
  const totalDiscount = totalPrice - totalSalePrice;
  const shipping = 0;

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

  const coupons = [
    { code: "EXTR150", label: "COUPON 70% OFF" },
    { code: "EXTR200", label: "COUPON 70% OFF" },
  ];

  return (
    <div className="bg-[#FFFBF6] min-h-screen w-full">
      <CartSavingsBanner savings={13.08} />
      <div className="flex flex-col lg:flex-row gap-8 mx-auto px-4 md:px-8 mt-6">
        {/* Left: Cart Items */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <CartList
            items={items}
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
            coupons={coupons}
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
