import React, { useState } from "react";
import { MapPin, Truck, RefreshCw, Gift, GiftIcon } from "lucide-react";
import PincodeInput from "@/components/pincode/PincodeInput";
import DeliveryIcon from "@/icons/DeliveryIcon";
import NoReturnIcon from "@/icons/NoReturnIcon";
import FreeIcon from "@/icons/FreeIcon";

const PurchaseSection = ({ pincode, onPincodeChange, onCheckDelivery, expectedDeliveryDate, deliveryLoading }) => {
  console.log(expectedDeliveryDate, "expectedDeliveryDate");
  return (
    <>
      {/* Delivery Information */}
      <div className="bg-white px-2 border border-gray-200 md:px-4 py-3 md:py-4 rounded-lg space-y-4 shadow-sm">
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
           <div className="bg-blue-100 p-2 rounded-full">
            <GiftIcon className="h-5 w-5 text-blue-700" />
           </div>
            <span className="text-base">Enjoy Free Delivery above ₹699</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseSection;
