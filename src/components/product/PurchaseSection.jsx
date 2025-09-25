import React, { useState } from "react";
import { MapPin, Truck, RefreshCw, Gift } from "lucide-react";
import PincodeInput from "@/components/pincode/PincodeInput";
import DeliveryIcon from "@/icons/DeliveryIcon";
import NoReturnIcon from "@/icons/NoReturnIcon";
import FreeIcon from "@/icons/FreeIcon";

const PurchaseSection = ({ pincode, onPincodeChange, onCheckDelivery, expectedDeliveryDate, deliveryLoading }) => {
  console.log(expectedDeliveryDate, "expectedDeliveryDate");
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
          deliveryLoading={deliveryLoading}
        />

        {/* Delivery Features */}
        <div className="space-y-3">
          {expectedDeliveryDate ? <div className="flex items-center gap-3">
            <DeliveryIcon />
            <span className="text-base">
              Expected delivery date -{" "}
              <strong>{expectedDeliveryDate}</strong>
            </span>
          </div> :
            null
            // <div className="flex items-center gap-3">
            //   <DeliveryIcon />
            //   <span className="text-base">
            //     Enter Pincode to check delivery date
            //   </span>
            // </div>
          }
          <div className="flex items-center gap-3">
            <NoReturnIcon />
            <span className="text-base">No Exchange & Returns</span>
          </div>
          <div className="flex items-center gap-3">
            <FreeIcon />
            <span className="text-base">Enjoy Free Delivery above ₹699</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseSection;
