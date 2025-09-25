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
import { toast } from "sonner";
import { setCookie } from "@/utils/cookies/setCookie";
import { getCookie } from "@/utils/cookies/getCookie";

const AddressPage = () => {
  const queryClient = useQueryClient();
  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    select: (data) => data?.data || [],
  });

  if (!getCookie("addressId")) {
    const defaultAddress = addresses.find(
      (address) => address.isDefault === true
    );
    if (defaultAddress) {
      setCookie("addressId", defaultAddress._id);
    }
  }

  const createMutation = useMutation({
    mutationFn: ({ data }) => createAddress({ data }),
    onSuccess: (res) => {
      if(res?.data?.isDefault){
        setCookie("addressId", res?.data?._id);
      }
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address added successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAddress({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address deleted successfully");
    },
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
      updateMutation.mutate({ id: addresses[editingIndex]._id, data: address });
    } else {
      createMutation.mutate({ data: address });
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
      addressName: `${address.firstName || ""} ${
        address.lastName || ""
      }'s address`,
    });
  };

  const confirmDelete = () => {
    if (
      deleteConfirmation.index !== null &&
      addresses[deleteConfirmation.index]
    ) {
      deleteMutation.mutate({id: addresses[deleteConfirmation.index]._id});
    }
    setDeleteConfirmation({ isOpen: false, index: null, addressName: "" });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, index: null, addressName: "" });
  };

  return (
    <RequireAuth>
      <div className="flex flex-col h-full">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 py-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
        </div>

        {/* Desktop Header */}
        <div
          className={`hidden lg:flex justify-between items-center p-4 ${
            addresses.length === 0
              ? "border border-transparent"
              : "border-b border-[#F59A1180]"
          }`}
        >
          <h2 className="text-xl font-medium">Saved Addresses</h2>
          <button
            className="flex cursor-pointer items-center gap-2 border border-[#004E6A] hover:bg-indigo-50 px-4 py-2 text-[#004E6A] rounded-lg"
            onClick={handleAddAddress}
          >
            <span className="text-xl">+</span>
            <span className="font-semibold text-base">ADD NEW ADDRESS</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <PrimaryLoader />
            </div>
          ) : addresses.length === 0 ? (
            <div className="px-4 py-8">
              <EmptyAddressState onAddAddress={handleAddAddress} />
            </div>
          ) : (
            <AddressList
              addresses={addresses}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              onSetDefault={(index) => {
                updateMutation.mutate({ id: addresses[index]._id, data: { isDefault: true } });
              }}
            />
          )}
        </div>

        {/* Mobile Add Button - After List */}
        <div className="lg:hidden px-4 py-4 bg-white border-t border-gray-200">
          <button
            className="w-full flex cursor-pointer items-center justify-center gap-2 border-2 border-[#004E6A] hover:bg-indigo-50 px-4 py-3 text-[#004E6A] rounded-lg font-semibold"
            onClick={handleAddAddress}
          >
            <span className="text-xl">+</span>
            <span className="text-base">ADD NEW ADDRESS</span>
          </button>
        </div>

        {/* Dialogs */}
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
