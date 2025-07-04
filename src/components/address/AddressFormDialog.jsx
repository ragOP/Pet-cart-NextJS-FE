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
import stateList from "@/utils/constants/stateList";

const fields = [
  { name: "firstName", label: "First Name", type: "text", required: true, validate: v => v.trim().length > 0 },
  { name: "lastName", label: "Last Name", type: "text", required: true, validate: v => v.trim().length > 0 },
  { name: "address", label: "Address", type: "text", required: true, validate: v => v.trim().length > 0 },
  { name: "city", label: "City", type: "text", required: true, validate: v => v.trim().length > 0 },
  { name: "zip", label: "Postal/ZIP Code", type: "text", required: true, validate: v => /^[0-9A-Za-z\- ]{4,10}$/.test(v) },
  { name: "country", label: "Country/Region", type: "text", required: true, validate: v => v.trim().length > 0 },
  { name: "phone", label: "Phone", type: "tel", required: true, validate: v => /^\d{10}$/.test(v) },
  { name: "type", label: "Address Type", type: "text", required: true, validate: v => ["home", "office", "other"].includes(v) },
];

const getStateCode = (stateValue) => {
  const found = stateList.find((s) => s.value === stateValue);
  return found ? found.code : "";
};

const AddressFormDialog = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    address: initialData.address || "",
    city: initialData.city || "",
    state: initialData.state || "",
    zip: initialData.zip || "",
    country: initialData.country || "",
    phone: initialData.phone || "",
    type: initialData.type || "home",
    isDefault: initialData.isDefault || false,
  });

  const [errors, setErrors] = useState({});
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const data = {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      address: initialData.address || "",
      city: initialData.city || "",
      state: initialData.state || "",
      zip: initialData.zip || "",
      country: initialData.country || "",
      phone: initialData.phone || "",
      type: initialData.type || "home",
      isDefault: initialData.isDefault || false,
    };
    setFormData(data);
    setOriginalData(data);
    setErrors({});
  }, [initialData, isOpen]);

  const hasChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: undefined });
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach(f => {
      if (f.required && (!formData[f.name] || (f.validate && !f.validate(formData[f.name])))) {
        if (f.name === "phone") newErrors[f.name] = "Enter a valid 10-digit phone number.";
        else if (f.name === "zip") newErrors[f.name] = "Enter a valid postal/ZIP code.";
        else newErrors[f.name] = `${f.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (Object.keys(originalData).length > 0 && !hasChanges()) {
      onClose();
      return;
    }

    const state_code = getStateCode(formData.state);
    onSave({ ...formData, state_code });
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open ? onClose() : undefined}>
      <DialogContent className="p-0 w-full">
        <DialogHeader className="px-6 py-4 bg-[#F59A111A]">
          <DialogTitle className="text-base font-medium">
            {Object.keys(originalData).length > 0 ? "Edit Address" : "New Address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(f => (
              <div className="flex flex-col gap-1" key={f.name}>
                <label htmlFor={f.name} className="text-sm text-gray-700">{f.label}</label>
                {f.name === "type" ? (
                  <select
                    id={f.name}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    required={f.required}
                    className="bg-[#6A68680D] rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
                  >
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <Input
                    id={f.name}
                    type={f.type}
                    name={f.name}
                    placeholder={f.label}
                    value={formData[f.name]}
                    onChange={handleChange}
                    required={f.required}
                    className="bg-[#6A68680D] placeholder:text-gray-500"
                  />
                )}
                {errors[f.name] && <span className="text-xs text-red-600 mt-1">{errors[f.name]}</span>}
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label htmlFor="state" className="text-sm text-gray-700">State/Province</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="bg-[#6A68680D] rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700"
              >
                <option value="">Select State</option>
                {stateList.map((state) => (
                  <option key={state.code} value={state.value}>{state.label}</option>
                ))}
              </select>
              {errors.state && <span className="text-xs text-red-600 mt-1">{errors.state}</span>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              id="isDefault"
            />
            <label htmlFor="isDefault">Set as default address</label>
          </div>

          <DialogFooter className="pb-4">
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
              type="submit"
              disabled={Object.keys(originalData).length > 0 && !hasChanges()}
              className={`px-4 py-2 rounded-lg transition-colors ${
                Object.keys(originalData).length > 0 && !hasChanges()
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-[#F59A11] text-white hover:bg-[#E58A00]"
              }`}
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
