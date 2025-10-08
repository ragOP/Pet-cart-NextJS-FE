import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MapPin } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AddressSelection = ({
    addresses = [],
    selectedAddressId,
    onAddressChange,
}) => {
    const router = useRouter();
    const [selectedAddress, setSelectedAddress] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (addresses.length > 0) {
            const defaultAddress = addresses.find((a) => a._id === selectedAddressId);
            const addressToSelect = defaultAddress ? defaultAddress._id : addresses[0]?._id;

            // Only update if the address is different from current selection
            if (addressToSelect && addressToSelect !== selectedAddress) {
                setSelectedAddress(addressToSelect);
                onAddressChange(addressToSelect);
            } else if (!selectedAddress && addressToSelect) {
                // Only set initial address if none is currently selected
                setSelectedAddress(addressToSelect);
                onAddressChange(addressToSelect);
            }
        }
    }, [addresses, selectedAddressId]); // Remove onAddressChange from dependencies

    const handleAddressChange = (addressId) => {
        setSelectedAddress(addressId);
        onAddressChange(addressId);
        setIsDialogOpen(false);
    };

    const getSelectedAddressDetails = () => {
        if (!selectedAddress) return null;
        return addresses.find(addr => addr._id === selectedAddress);
    };

    const selectedAddressDetails = getSelectedAddressDetails();

    console.log(selectedAddressDetails)

    return (
        <>
            <div className="p-4 border-b border-[#0000001A]">
                <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-lg text-gray-800">Delivery Address</div>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 bg-[#F59A11] text-white rounded-lg hover:bg-[#E58A00] transition-colors text-sm font-medium"
                    >
                        {selectedAddress ? "Change" : "Select"} Address
                    </button>
                </div>

                {selectedAddressDetails ? (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-[#F59A11] mt-0.5 flex-shrink-0" />
                            <div className="flex-1 text-sm">

                                <div className="font-medium text-gray-800 mb-1">
                                    {selectedAddressDetails.firstName || ""} {selectedAddressDetails.lastName || ""} -
                                    {selectedAddressDetails.phone && (
                                        <span className="text-gray-600 text-sm ml-2">
                                            {selectedAddressDetails.phone} 
                                        </span>
                                    )}
                                </div>
                                <div className="text-gray-600">
                                    {selectedAddressDetails.address || ""}
                                    {`, ${selectedAddressDetails.city || ""}, ${selectedAddressDetails.state || ""} - ${selectedAddressDetails.zip || ""}`}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-sm">No delivery address selected</p>
                    </div>
                )}
            </div>

            {/* Address Selection Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="p-0 w-full sm:max-w-lg max-h-[80vh] overflow-hidden">
                    <DialogHeader className="px-6 py-4 bg-[#F59A111A]">
                        <DialogTitle className="text-base font-medium">Select Delivery Address</DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-4">
                        {addresses.length > 0 ? (
                            <RadioGroup
                                value={selectedAddress}
                                onValueChange={handleAddressChange}
                                className="space-y-3"
                            >
                                {addresses.map((address) => (
                                    <div
                                        key={address._id}
                                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedAddress === address._id
                                            ? "border-[#F59A11] bg-[#FFF7E6]"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        onClick={() => handleAddressChange(address._id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <RadioGroupItem
                                                value={address._id}
                                                id={`address-${address._id}`}
                                                className="w-4 h-4 text-[#F59A11] border-gray-300 focus:ring-[#F59A11] mt-0.5 flex-shrink-0"
                                            />
                                            <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${selectedAddress === address._id ? "text-[#F59A11]" : "text-gray-400"
                                                }`} />
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-800 mb-1">
                                                    {address.phone && (
                                                        <span className="text-gray-600 text-sm mr-2">
                                                            {address.phone} -
                                                        </span>
                                                    )}
                                                    {address.firstName} {address.lastName}
                                                </div>
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <div>{address.address}</div>
                                                    <div>
                                                        {address.city}, {address.state} - {address.zip}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">No addresses available</p>
                                <button
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        router.push("/account/address");
                                    }}
                                    className="px-4 py-2 bg-[#F59A11] text-white rounded-lg hover:bg-[#E58A00] transition-colors"
                                >
                                    Add New Address
                                </button>
                            </div>
                        )}
                    </div>

                    {addresses.length > 0 && (
                        <DialogFooter className="p-4 border-t">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="px-4 py-2 bg-[#F59A11] text-white rounded-lg hover:bg-[#E58A00] transition-colors w-full"
                            >
                                Confirm Selection
                            </button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddressSelection; 