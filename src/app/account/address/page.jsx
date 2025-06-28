"use client";

import React, { useState } from "react";
import AddressList from "@/components/address/AddressList";
import EmptyAddressState from "@/components/address/EmptyAddressState";
import AddressFormDialog from "@/components/address/AddressFormDialog";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";

const DUMMY_ADDRESSES = [
  {
    firstName: "Akash",
    lastName: "Harchekar",
    company: "Technocity IT Premises",
    address1: "901, 9th Floor",
    address2: "MIDC, Mahape Road",
    city: "Ghansoli",
    state: "Maharashtra",
    country: "India",
    postalCode: "400710",
    phone: "9309746207",
    isDefault: true,
  },
  {
    firstName: "Raj",
    lastName: "Sharma",
    company: "Home",
    address1: "Building A-5, Flat 302",
    address2: "Sector 15, Vashi",
    city: "Navi Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400703",
    phone: "9876543210",
    isDefault: false,
  },
  {
    firstName: "Priya",
    lastName: "Singh",
    company: "Office",
    address1: "Tower B, 14th Floor",
    address2: "Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400051",
    phone: "9123456789",
    isDefault: false,
  },
];

const AddressPage = () => {
  const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    index: null,
    addressName: "",
  });

  const handleSaveAddress = (address) => {
    if (editingIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = address;
      setAddresses(updatedAddresses);
    } else {
      setAddresses([...addresses, address]);
    }
    setEditingIndex(null);
    setIsDialogOpen(false);
  };

  const handleEditAddress = (index) => {
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleAddAddress = () => {
    setEditingIndex(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingIndex(null);
  };

  const handleDeleteAddress = (index) => {
    const address = addresses[index];
    setDeleteConfirmation({
      isOpen: true,
      index,
      addressName: `${address.firstName} ${address.lastName}'s address`,
    });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.index !== null) {
      setAddresses(addresses.filter((_, i) => i !== deleteConfirmation.index));
    }
    setDeleteConfirmation({ isOpen: false, index: null, addressName: "" });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, index: null, addressName: "" });
  };

  return (
    <div className="border flex flex-col gap-4 border-[#F59A1180] h-full rounded-lg">
      <div
        className={`flex justify-between items-center p-4 ${
          addresses.length === 0
            ? "border border-transparent"
            : "border-b border-[#F59A1180]"
        }`}
      >
        <h2 className="text-xl font-medium">Saved Addresses</h2>
        <button
          className="flex cursor-pointer items-center gap-2 border border-[#004E6A] hover:bg-indigo-50 px-4 py-2 text-[#004E6A]"
          onClick={handleAddAddress}
        >
          <span className="text-xl">+</span>
          <span className="font-semibold text-base">ADD NEW ADDRESS</span>
        </button>
      </div>
      {addresses.length === 0 ? (
        <EmptyAddressState onAddAddress={handleAddAddress} />
      ) : (
        <AddressList
          addresses={addresses}
          onEdit={handleEditAddress}
          onDelete={handleDeleteAddress}
          onSetDefault={(index) => {
            const updatedAddresses = addresses.map((address, i) => ({
              ...address,
              isDefault: i === index,
            }));
            setAddresses(updatedAddresses);
          }}
        />
      )}
      <AddressFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveAddress}
        initialData={editingIndex !== null ? addresses[editingIndex] : {}}
      />
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Address"
        message={`Are you sure you want to delete ${deleteConfirmation.addressName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default AddressPage;
