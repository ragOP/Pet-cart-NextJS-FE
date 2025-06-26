import React from "react";

const CartCouponSection = ({ coupons, onApply, onRemove, appliedCoupon }) => (
  <div className="p-4">
    <div className="font-semibold text-lg mb-3">Available Coupons</div>
    <div className="flex flex-wrap gap-3">
      {coupons.map((coupon) => (
        <div
          key={coupon.code}
          className={`px-4 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2 shadow-sm ${appliedCoupon === coupon.code ? 'bg-[#FFF7E6] border-[#F59A11] text-[#F59A11]' : 'bg-[#F3F3F3] border-[#F3F3F3] text-gray-700'}`}
        >
          <span>{coupon.label}</span>
          {appliedCoupon === coupon.code ? (
            <button onClick={() => onRemove(coupon.code)} className="ml-2 text-xs underline">Remove</button>
          ) : (
            <button onClick={() => onApply(coupon.code)} className="ml-2 text-xs underline cursor-pointer">Apply</button>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default CartCouponSection;
