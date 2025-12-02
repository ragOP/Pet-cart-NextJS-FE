"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const CheckoutDialog = ({
  isOpen,
  onClose,
  onConfirmCheckout,
  selectedAddressId,
}) => {
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onConfirmCheckout({
      note,
      addressId: selectedAddressId,
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
          {/* Note */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Name of the pet (Optional)</label>
            <Input
              placeholder="Enter the name of the pet..."
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
            className="px-4 py-2 rounded-lg bg-[#F59A11] text-white hover:bg-[#E58A00] cursor-pointer"
          >
            Place Order
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
