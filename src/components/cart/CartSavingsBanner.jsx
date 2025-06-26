import React from "react";

const CartSavingsBanner = ({ savings }) => (
  <div
    className="w-full text-white flex items-center justify-center text-lg font-semibold"
    style={{
      background: "linear-gradient(90deg, #278939 0%, #419351 12.15%, #91DD9E 25.48%, #419351 37.98%, #278939 100%)",
      borderRadius: 0,
      minHeight: 56,
    }}
  >
    <span className="py-3 w-full text-center">
      You're saving <span className="font-bold">₹{savings}</span> on this order
    </span>
  </div>
);

export default CartSavingsBanner;
