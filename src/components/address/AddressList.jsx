import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Check, Trash2 } from "lucide-react";

function AddressListItem({ address, onEdit, onDelete, onSetDefault, idx }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    onEdit(idx);
    setShowDropdown(false);
  };

  const handleDelete = () => {
    onDelete(idx);
    setShowDropdown(false);
  };

  const handleSetDefault = () => {
    onSetDefault(idx);
    setShowDropdown(false);
  };

  return (
    <div className="bg-[#F9F7F3] border border-[#F59A111A] rounded-lg px-6 py-4 flex flex-col gap-2 relative ">
      <div className="absolute top-2 right-4" ref={dropdownRef}>
        <button
          className="p-1 cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="More options"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <MoreVertical size={20} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-50">
            <button
              onClick={handleEdit}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </button>
            {!address.isDefault && (
              <button
                onClick={handleSetDefault}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Check size={16} />
                Set Default
              </button>
            )}
            <button
              onClick={handleDelete}
              className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="text-base font-medium text-[#222] leading-snug break-words">
        <span>
          {address.firstName} {address.lastName}, {address.address1}
          {address.address2 ? `, ${address.address2}` : ""}, {address.city},{" "}
          {address.state}, {address.country}, {address.postalCode}
        </span>
      </div>
      <div className="text-[#B3B3B3] font-medium text-base">
        Mobile No. :{" "}
        <span className="text-[#222] font-bold">{address.phone}</span>
      </div>

      {address.isDefault && (
        <div className="absolute bottom-4 mt-2 right-4 flex items-center gap-1 bg-[#F9F7F3] border border-[#B3B3B3] rounded-full px-3 py-1 text-xs text-[#6A6868] font-medium">
          <Check size={16} color="#6A6868" />
          Default Address
        </div>
      )}
    </div>
  );
}

const AddressList = ({ addresses, onEdit, onDelete, onSetDefault }) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      {addresses.map((address, idx) => (
        <AddressListItem
          key={idx}
          address={address}
          idx={idx}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetDefault={onSetDefault}
        />
      ))}
    </div>
  );
};

export default AddressList;
