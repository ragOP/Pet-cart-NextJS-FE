import React, { useState } from "react";
import { MapPin, Truck, RefreshCw, Gift } from "lucide-react";
import PincodeInput from "@/components/pincode/PincodeInput";

const PurchaseSection = ({
  pincode,
  onPincodeChange,
  onCheckDelivery,
}) => {

  return (
    <>
      {/* Delivery Information */}
      <div className="bg-[#ECECEC66] px-2 md:px-6 py-3 md:py-4 rounded-lg space-y-4">
        <h3 className="font-semibold text-gray-900">
          Delivery & Service Information
        </h3>

        {/* Pincode Check */}
        <PincodeInput
          pincode={pincode}
          onPincodeChange={onPincodeChange}
          onCheckDelivery={onCheckDelivery}
        />

        {/* Delivery Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-orange-500" />
            <span className="text-sm">
              Expected delivery date -{" "}
              <strong>Tomorrow (Thu Jun 12 2025 - By 9PM)</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-orange-500" />
            <span className="text-sm">No Exchange & Returns</span>
          </div>
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-blue-500" />
            <span className="text-sm">Enjoy Free Delivery above ₹699</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseSection;
