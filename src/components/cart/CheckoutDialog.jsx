"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const CheckoutDialog = ({
  isOpen,
  onClose,
  addresses = [],
  selectedAddressId,
  onConfirmCheckout,
}) => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (isOpen && addresses.length > 0) {
      const defaultAddress = addresses.find((a) => a._id === selectedAddressId);
      setSelectedAddress(defaultAddress ? defaultAddress._id : addresses[0]._id);
    }
  }, [isOpen, addresses]);

  const handleSubmit = () => {
    if (!selectedAddress || !paymentMethod) return;
    onConfirmCheckout({
      addressId: selectedAddress,
      paymentMethod,
      note,
    });
    onClose();
  };


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 w-full sm:max-w-lg">
        <DialogHeader className="px-6 py-4 bg-[#F59A111A]">
          <DialogTitle className="text-base font-medium">Confirm Checkout</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-4">

          {/* Address Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Select Address</label>
            <select
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              {addresses.length > 0 ? addresses.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.firstName}, {address.city}, {address.state}
                </option>
              )) : <option value="">No addresses available</option>}
            </select>
            <div className="w-full flex justify-end">
            {addresses.length === 0 && (
              <p onClick={() => router.push("/account/address")} className="text-xs text-[#F59A11] underline cursor-pointer">
                Add address
              </p>
            )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Payment Method</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
              {/* <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                Online Payment
              </label> */}
            </div>
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Note (Optional)</label>
            <Input
              placeholder="Leave a note for delivery..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-[#6A68680D] border border-gray-300 text-sm"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="p-4">
          <DialogClose asChild>
            <button
              type="button"
              className="border border-gray-300 rounded-lg px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#F59A11] text-white hover:bg-[#E58A00] cursor-pointer disabled:opacity-50" 
            disabled={!selectedAddress || !paymentMethod}
          >
            Place Order
          </button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
