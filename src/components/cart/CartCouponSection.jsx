import React from "react";

const CartCouponSection = ({ coupons, onApply, onRemove, appliedCoupon }) => {
  const couponCode = coupons?.find((coupon) => coupon._id === appliedCoupon)?.code;
  return (
    <div className="p-4">
    <div className="font-semibold text-lg mb-3">Available Coupons</div>
    <div className="flex flex-wrap gap-3">
      {coupons.map((coupon) => (
        <div
          key={coupon._id}
          className={`px-4 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2 shadow-sm ${couponCode === coupon.code ? 'bg-[#FFF7E6] border-[#F59A11] text-[#F59A11]' : 'bg-[#F3F3F3] border-[#F3F3F3] text-gray-700'}`}
        >
          <span>{coupon.code}</span>
          {couponCode === coupon.code ? (
            <button onClick={() => onRemove(coupon._id)} className="ml-2 text-xs underline">Remove</button>
          ) : (
            <button onClick={() => onApply(coupon._id)} className="ml-2 text-xs underline cursor-pointer">Apply</button>
          )}
        </div>
      ))}
    </div>
  </div>
);
};

export default CartCouponSection;
