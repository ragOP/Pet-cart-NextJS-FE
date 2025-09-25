import React from "react";

const CartSummary = ({ totalMrp, totalPrice, shipping, taxBreakup = {}, couponDiscount = 0, onPay, estimatedDeliveryDate }) => {
  const { cgst = 0, sgst = 0, igst = 0, cess = 0 } = taxBreakup;

  return (
    <div className="flex flex-col h-max justify-between bg-white rounded-xl">
      <div className="flex-shrink-0">
        <div className="p-4">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span role="img" aria-label="price">🏷️</span> Price Details
          </div>
          <div className="flex flex-col gap-2 text-base">
            <div className="flex justify-between"><span>Total MRP Price</span><span>₹{totalMrp.toFixed(2)}</span></div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Coupon Discount</span><span>- ₹{couponDiscount.toFixed(2)}</span>
            </div>
            {cgst > 0 && <div className="flex justify-between"><span>CGST</span><span>₹{cgst.toFixed(2)}</span></div>}
            {sgst > 0 && <div className="flex justify-between"><span>SGST</span><span>₹{sgst.toFixed(2)}</span></div>}
            {igst > 0 && <div className="flex justify-between"><span>IGST</span><span>₹{igst.toFixed(2)}</span></div>}
            {cess > 0 && <div className="flex justify-between"><span>CESS</span><span>₹{cess.toFixed(2)}</span></div>}
            {shipping && <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span>Shipping Charges</span>
                <span className="text-xs text-gray-400">Expected Delivery By : {estimatedDeliveryDate}</span>
              </div>
              <span className="text-green-600 font-semibold">
                {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
              </span>
            </div>}
          </div>
        </div>

        <div className="border-t border-dashed border-[#f59a10]" />
      </div>

      <div className="p-4 flex-shrink-0">
        <div className="flex justify-between items-center text-lg font-bold mb-4">
          <span>To Pay</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <button
        onClick={() => {
          onPay();
        }}
        className="w-full bg-[#F59A11] cursor-pointer hover:bg-[#D9820A] text-white font-bold py-3 rounded-lg text-lg transition-colors">
          PAY
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
