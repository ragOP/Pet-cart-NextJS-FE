import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const AddressFormDialog = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    company: initialData.company || "",
    address1: initialData.address1 || "",
    address2: initialData.address2 || "",
    city: initialData.city || "",
    state: initialData.state || "",
    country: initialData.country || "",
    postalCode: initialData.postalCode || "",
    phone: initialData.phone || "",
    isDefault: initialData.isDefault || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              name="company"
              placeholder="Company/Home"
              value={formData.company}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              name="address1"
              placeholder="Address 1"
              value={formData.address1}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              name="address2"
              placeholder="Address 2"
              value={formData.address2}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              name="state"
              placeholder="State/Province"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country/Region"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal/ZIP Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <label>Set as default address</label>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#F59A11] text-white px-4 py-2 rounded-lg hover:bg-[#E58A00]"
            >
              SAVE ADDRESS
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressFormDialog;
