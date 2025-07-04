"use client";

import React, { useState } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import AddressList from "@/components/address/AddressList";
import EmptyAddressState from "@/components/address/EmptyAddressState";
import AddressFormDialog from "@/components/address/AddressFormDialog";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAddresses } from "@/app/apis/getAddresses";
import { createAddress } from "@/app/apis/createAddress";
import { updateAddress } from "@/app/apis/updateAddress";
import { deleteAddress } from "@/app/apis/deleteAddress";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";

const AddressPage = () => {
  const queryClient = useQueryClient();
  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    select: (data) => data?.data?.data || [],
  });

  const createMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses"] }),
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    index: null,
    addressName: "",
  });

  const handleSaveAddress = (address) => {
    if (editingIndex !== null && addresses[editingIndex]) {
      updateMutation.mutate({ id: addresses[editingIndex].id, data: address });
    } else {
      createMutation.mutate(address);
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
    if (
      deleteConfirmation.index !== null &&
      addresses[deleteConfirmation.index]
    ) {
      deleteMutation.mutate(addresses[deleteConfirmation.index].id);
    }
    setDeleteConfirmation({ isOpen: false, index: null, addressName: "" });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, index: null, addressName: "" });
  };

  console.log("Addresses:", addresses);

  return (
    <RequireAuth>
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
        {isLoading ? (
          <PrimaryLoader />
        ) : addresses.length === 0 ? (
          <EmptyAddressState onAddAddress={handleAddAddress} />
        ) : (
          <AddressList
            addresses={addresses}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
            onSetDefault={(index) => {
              // You may want to implement set default logic here
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
    </RequireAuth>
  );
};

export default AddressPage;
