import React, { useState } from "react";
import { MapPin } from "lucide-react";

const fetchPincodeFromLocation = async () => {
  if (!navigator.geolocation) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
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

const PincodeInput = ({ pincode, onPincodeChange, onCheckDelivery, className, deliveryLoading }) => {
  const [loadingPin, setLoadingPin] = useState(false);

  const handleLocationClick = async () => {
    setLoadingPin(true);
    const pin = await fetchPincodeFromLocation();
    if (pin) onPincodeChange(pin);
    setLoadingPin(false);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="flex-1 flex gap-2 items-center border p-1 md:p-1.5 bg-white border-gray-300 rounded-lg ">
        <div
          className="border-r h-full pl-2 flex items-center cursor-pointer"
          onClick={handleLocationClick}
          title="Detect my location"
        >
          <MapPin
            className={`w-4 h-4 mr-2 md:w-4 md:h-4  md:mr-3 text-[#F59A11] ${
              loadingPin ? "animate-pulse" : ""
            }`}
          />
        </div>
        <input
          type="text"
          placeholder="Enter PINCODE to check delivery date"
          value={pincode}
          onChange={(e) => onPincodeChange(e.target.value)}
          className="flex-1 ml-1 md:ml-2 md:text-small text-sm outline-none bg-transparent"
        />
        <button
          onClick={onCheckDelivery}
          className="bg-[#F59A11] cursor-pointer hover:bg-[#D9820A] text-white px-3 md:px-8 py-1.5 md:py-1.5 rounded-lg font-semibold"
        >
          {deliveryLoading ? "CHECKING..." : "CHECK"}
        </button>
      </div>
    </div>
  );
};

export default PincodeInput;
