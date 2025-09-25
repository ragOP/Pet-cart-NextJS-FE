import React from "react";
import EmptyAddressIcon from "@/icons/EmptyAddressIcon";

const EmptyAddressState = ({ onAddAddress }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <EmptyAddressIcon className="w-20 h-20 sm:w-24 sm:h-24 mb-4" />
      <p className="text-[#6A6868] text-base sm:text-lg lg:text-[20px] mb-6 w-full max-w-md text-center leading-relaxed">
        Looks like you haven't added a delivery address. Add one now to get your goodies delivered to the right doorstep!
      </p>
      <button
        className="bg-[#F59A11] cursor-pointer text-white px-6 py-3 font-semibold hover:bg-[#E58A00] rounded-lg text-sm sm:text-base transition-colors"
        onClick={onAddAddress}
      >
        + ADD NEW ADDRESS
      </button>
    </div>
  );
};

export default EmptyAddressState;
