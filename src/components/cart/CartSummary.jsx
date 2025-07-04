import React from "react";

const CartSummary = ({ totalMrp, totalPrice, shipping, taxBreakup = {} }) => {
  const { cgst = 0, sgst = 0, igst = 0, cess = 0 } = taxBreakup;

  return (
    <div className="flex flex-col h-max justify-between bg-white rounded-xl">
      <div className="flex-shrink-0">
        <div className="p-4">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span role="img" aria-label="price">🏷️</span> Price Details
          </div>
          <div className="flex flex-col gap-2 text-base">
            <div className="flex justify-between"><span>Total MRP Price</span><span>₹{totalMrp}</span></div>
            <div className="flex justify-between"><span>Coupon Discount</span><span>₹0</span></div>
            {/* <div className="flex justify-between"><span>Discount on MRP</span><span>₹{totalDiscount}</span></div> */}
            <div className="flex justify-between"><span>CGST</span><span>₹{cgst}</span></div>
            <div className="flex justify-between"><span>SGST</span><span>₹{sgst}</span></div>
            <div className="flex justify-between"><span>IGST</span><span>₹{igst}</span></div>
            <div className="flex justify-between"><span>CESS</span><span>₹{cess}</span></div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span>Shipping Charges</span>
                <span className="text-xs text-gray-400">To be applied at checkout</span>
              </div>
              <span className="text-green-600 font-semibold">
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
          </div>
        </div>

        <div
          className="border-t border-dashed"
          style={{
            borderColor: "#F59A1166",
            borderTopStyle: "dashed",
            borderTopWidth: 1,
            borderTopColor: "#F59A1166",
            borderTop: "1px dashed #F59A1166",
            borderImage: "repeating-linear-gradient(to right, #F59A1166 0 8px, transparent 8px 16px) 30",
          }}
        />
      </div>

      <div className="p-4 flex-shrink-0">
        <div className="flex justify-between items-center text-lg font-bold mb-4">
          <span>To Pay</span>
          <span>₹{totalPrice}</span>
        </div>
        <button className="w-full bg-[#F59A11] cursor-pointer hover:bg-[#D9820A] text-white font-bold py-3 rounded-lg text-lg transition-colors">
          PAY
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
