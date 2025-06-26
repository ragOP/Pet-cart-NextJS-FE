import React from "react";
import CustomImage from "@/components/images/CustomImage";
import { Trash2 } from "lucide-react";

const CartItem = ({ item, onQtyChange, onRemove }) => (
  <div className="bg-white rounded-xl p-4 flex gap-4 items-start border border-[#F59A1133] w-full">
    <CustomImage
      src={item.img}
      alt={item.title}
      className="w-36 h-full object-contain rounded-lg bg-[#FFF7E6]"
    />
    <div className="flex-1 flex flex-col justify-between self-stretch">
      {/* Top section: Title and Delete button */}
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-2">
          <h2
            className="text-[20px] font-normal text-gray-800"
            style={{ lineHeight: "1.4" }}
          >
            {item.title}
          </h2>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 cursor-pointer rounded-full bg-white hover:bg-gray-100 text-gray-500 hover:text-red-500 flex-shrink-0"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Variant Text */}

      <div>
        <div className="inline-block px-3 py-1 text-sm rounded-lg bg-[#E3EBEE] text-gray-700 font-semibold mb-2 mt-1 self-start">
          {item.subtitle}
        </div>

        {/* Bottom section: Price and Quantity */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800">
              ₹{item.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₹{item.mrp}
            </span>
          </div>
          <div className="flex items-center border border-[#004E6A80] bg-[#004E6A05] rounded-[24px]">
            <button
              onClick={() => onQtyChange(item.id, -1)}
              className="px-5 py-1 text-lg text-gray-700 border-r border-[#004E6A80]"
            >
              -
            </button>
            <span className="px-4 py-1 text-lg font-semibold">
              {item.quantity}
            </span>
            <button
              onClick={() => onQtyChange(item.id, 1)}
              className="px-3 py-1 text-lg text-gray-700 border-l border-[#004E6A80]"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CartItem;
