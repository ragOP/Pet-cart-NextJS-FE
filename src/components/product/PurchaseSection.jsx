import React from "react";
import { MapPin, Truck, RefreshCw, Gift } from "lucide-react";

const PurchaseSection = ({
  pincode,
  onPincodeChange,
  onCheckDelivery,
  onAddToCart,
}) => (
  <>
    {/* Add to Cart Button */}
    <button
      onClick={onAddToCart}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
    >
      ADD TO CART
    </button>

    {/* Delivery Information */}
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <h3 className="font-semibold text-gray-900">
        Delivery & Service Information
      </h3>

      {/* Pincode Check */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Enter PINCODE to check delivery date"
            value={pincode}
            onChange={(e) => onPincodeChange(e.target.value)}
            className="flex-1 outline-none bg-transparent"
          />
        </div>
        <button
          onClick={onCheckDelivery}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          CHECK
        </button>
      </div>

      {/* Delivery Features */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-orange-500" />
          <span className="text-sm">
            Expected delivery date - <strong>Tomorrow (Thu Jun 12 2025 - By 9PM)</strong>
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

export default PurchaseSection;
