"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

const CouponsDialog = ({ isOpen, onClose }) => {
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const coupons = [
    {
      id: 1,
      code: "WELCOME20",
      discount: "20%",
      description: "Extra ₹150 off on your first order above",
      minOrder: "₹1499",
      validUntil: "31 Dec 2024",
      isActive: true,
    },
    {
      id: 2,
      code: "SAVE50",
      discount: "₹50",
      description: "Flat ₹50 off on orders above",
      minOrder: "₹1000",
      validUntil: "15 Jan 2025",
      isActive: true,
    },
    {
      id: 3,
      code: "FREESHIP",
      discount: "Free",
      description: "Free delivery on orders above",
      minOrder: "₹699",
      validUntil: "28 Feb 2025",
      isActive: true,
    },
    {
      id: 4,
      code: "NEWUSER",
      discount: "15%",
      description: "15% off for new users above",
      minOrder: "₹300",
      validUntil: "20 Jan 2025",
      isActive: false,
    },
  ];

  const handleCopyCoupon = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCoupon(code);
      setTimeout(() => setCopiedCoupon(null), 2000);
    } catch (err) {
      console.error("Failed to copy coupon:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 flex flex-col">
        {/* Header - Static */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            Available Coupons & Offers
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`relative ${
                  coupon.isActive ? "opacity-100" : "opacity-60"
                }`}
              >
                {/* Coupon Card */}
                <div className="relative bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Scalloped edges effect */}
                  <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-r from-orange-50 to-orange-100 transform translate-x-6">
                    <div className="absolute top-1 right-0 w-3 h-3 bg-white rounded-full transform translate-x-1.5 -translate-y-1.5"></div>
                    <div className="absolute top-5 right-0 w-3 h-3 bg-white rounded-full transform translate-x-1.5"></div>
                    <div className="absolute top-9 right-0 w-3 h-3 bg-white rounded-full transform translate-x-1.5"></div>
                    <div className="absolute top-13 right-0 w-3 h-3 bg-white rounded-full transform translate-x-1.5"></div>
                    <div className="absolute top-17 right-0 w-3 h-3 bg-white rounded-full transform translate-x-1.5"></div>
                    <div className="absolute bottom-1 right-0 w-3 h-3 bg-white rounded-full transform translate-x-1.5 translate-y-1.5"></div>
                  </div>
                  
                  <div className="flex items-center p-5 pr-16">
                    {/* Left Icon */}
                    <div className="flex-shrink-0 mr-5">
                      <div className="w-10 h-10 border-3 border-black rounded-full flex items-center justify-center bg-white shadow-sm">
                        <span className="text-black font-bold text-base">%</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="text-green-800 text-base font-semibold mb-1">
                        {coupon.description}
                      </div>
                      <div className="text-green-700 text-sm">
                        {coupon.minOrder}. Use Code : 
                        <span className="text-orange-600 font-bold ml-2 text-base">{coupon.code}</span>
                      </div>
                    </div>
                    
                    {/* Copy Icon - Extreme Right */}
                    <button
                      onClick={() => handleCopyCoupon(coupon.code)}
                      disabled={!coupon.isActive}
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-200 ${
                        coupon.isActive
                          ? "bg-orange-200 hover:bg-orange-300 hover:scale-110 shadow-sm"
                          : "bg-gray-200 cursor-not-allowed"
                      }`}
                    >
                      {copiedCoupon === coupon.code ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-700" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">How to use coupons:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Copy the coupon code</li>
              <li>• Add items to your cart</li>
              <li>• Apply the code at checkout</li>
              <li>• Enjoy your savings!</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CouponsDialog;
