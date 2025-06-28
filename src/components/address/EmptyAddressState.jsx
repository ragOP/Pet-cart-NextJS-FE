import React from "react";
import EmptyAddressIcon from "@/icons/EmptyAddressIcon";

const EmptyAddressState = ({ onAddAddress }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <EmptyAddressIcon className="w-24 h-24" />
      <p className="text-[#6A6868] text-[20px] mb-4 w-[75%] text-center">
        Looks like you haven't added a delivery address. Add one now to get your goodies delivered to the right doorstep!
      </p>
      <button
        className="bg-[#F59A11] cursor-pointer text-white px-4 py-2 font-semibold hover:bg-[#E58A00]"
        onClick={onAddAddress}
      >
        + ADD NEW ADDRESS
      </button>
    </div>
  );
};

export default EmptyAddressState;
