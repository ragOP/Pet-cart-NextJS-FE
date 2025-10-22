import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";
import { Wallet } from "lucide-react";

const CartSummary = ({ totalMrp, totalPrice, shipping, taxBreakup = {}, couponDiscount = 0, onPay, estimatedDeliveryDate, onWalletToggle }) => {
  const { cgst = 0, sgst = 0, igst = 0, cess = 0 } = taxBreakup;
  const user = useSelector(selectUser);
  const [isUsingWallet, setIsUsingWallet] = useState(false);
  
  const walletBalance = user?.walletBalance || 0;
  const hasWalletAmount = walletBalance > 0;
  
  const handleWalletToggle = (checked) => {
    setIsUsingWallet(checked);
    onWalletToggle?.(checked);
  };
  
  const walletDiscount = isUsingWallet ? Math.min(walletBalance, totalPrice) : 0;
  const finalAmount = totalPrice - walletDiscount;

  return (
    <div className="flex flex-col h-max justify-between bg-white rounded-xl">
      <div className="flex-shrink-0">
        <div className="px-4 pb-4">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span role="img" aria-label="price">🏷️</span> Price Details
          </div>
          <div className="flex flex-col gap-2 text-base">
            <div className="flex justify-between"><span>Total MRP</span><span className="line-through">₹{totalMrp.toFixed(2)}</span></div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Coupon discount</span><span>- ₹{couponDiscount.toFixed(2)}</span>
            </div>
            {cgst > 0 && <div className="flex justify-between"><span>CGST</span><span>₹{cgst.toFixed(2)}</span></div>}
            {sgst > 0 && <div className="flex justify-between"><span>SGST</span><span>₹{sgst.toFixed(2)}</span></div>}
            {igst > 0 && <div className="flex justify-between"><span>IGST</span><span>₹{igst.toFixed(2)}</span></div>}
            {cess > 0 && <div className="flex justify-between"><span>CESS</span><span>₹{cess.toFixed(2)}</span></div>}
            {shipping && <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span>Shipment Charges</span>
                <span className="text-xs text-gray-400">Expected Delivery By : {estimatedDeliveryDate}</span>
              </div>
              <span className="text-green-600 font-semibold">
                {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
              </span>
            </div>}
            
            {/* Wallet Option - Only show if user has wallet amount */}
            {hasWalletAmount && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#F59A11]" />
                    <span className="text-sm font-medium">Use Wallet Balance</span>
                    <span className="text-xs text-gray-500">(₹{walletBalance.toFixed(2)} available)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUsingWallet}
                      onChange={(e) => handleWalletToggle(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F59A11]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F59A11]"></div>
                  </label>
                </div>
                {isUsingWallet && walletDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium mt-2">
                    <span>Wallet Discount</span>
                    <span>- ₹{walletDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-dashed border-[#f59a10]" />
      </div>

      <div className="p-4 flex-shrink-0">
        <div className="flex justify-between items-center text-lg font-bold mb-4">
          <span>To Pay</span>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>
        {isUsingWallet && walletDiscount > 0 && (
          <div className="text-sm text-gray-600 mb-2 text-center">
            (₹{totalPrice.toFixed(2)} - ₹{walletDiscount.toFixed(2)} wallet discount)
          </div>
        )}
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
