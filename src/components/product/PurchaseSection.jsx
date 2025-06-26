import React, { useState } from "react";
import { MapPin, Truck, RefreshCw, Gift } from "lucide-react";

const fetchPincodeFromLocation = async () => {
  if (!navigator.geolocation) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Use a free reverse geocoding API (e.g., Nominatim)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const pincode = data.address.postcode || "";
          resolve(pincode);
        } catch {
          resolve("");
        }
      },
      () => resolve("")
    );
  });
};

const PurchaseSection = ({
  pincode,
  onPincodeChange,
  onCheckDelivery,
  onAddToCart,
}) => {
  const [loadingPin, setLoadingPin] = useState(false);

  const handleLocationClick = async () => {
    setLoadingPin(true);
    const pin = await fetchPincodeFromLocation();
    if (pin) onPincodeChange(pin);
    setLoadingPin(false);
  };

  return (
    <>
      {/* Delivery Information */}
      <div className="bg-[#ECECEC66] px-2 md:px-6 py-3 md:py-4 rounded-lg space-y-4">
        <h3 className="font-semibold text-gray-900">
          Delivery & Service Information
        </h3>

        {/* Pincode Check */}
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2 items-center border p-1 md:p-2 bg-white border-gray-300 rounded-lg ">
            <div
              className="border-r h-full pl-2 flex items-center cursor-pointer"
              onClick={handleLocationClick}
              title="Detect my location"
            >
              <MapPin
                className={`w-4 h-4 mr-2 md:w-5 md:h-5  md:mr-3 text-[#F59A11] ${
                  loadingPin ? "animate-pulse" : ""
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Enter PINCODE to check delivery date"
              value={pincode}
              onChange={(e) => onPincodeChange(e.target.value)}
              className="flex-1 ml-1 md:ml-2 md:text-base text-sm outline-none bg-transparent"
            />
            <button
              onClick={onCheckDelivery}
              className="bg-[#F59A11] hover:bg-[#D9820A] text-white px-3 md:px-8 py-2 md:py-2.5 rounded-lg font-semibold"
            >
              CHECK
            </button>
          </div>
        </div>

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
