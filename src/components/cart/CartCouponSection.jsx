import React, { useState } from "react";
import { Tag, CheckCircle, X, ChevronDown, Calendar, Users, ShoppingBag, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const CartCouponSection = ({ coupons, onApply, onRemove, appliedCoupon, cartTotal = 0 }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const appliedCouponData = coupons?.find((coupon) => coupon._id === appliedCoupon);

  const handleApplyCoupon = (couponId) => {
    setSelectedCouponId(couponId);
    // Don't close dialog immediately - let user confirm selection
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setSearchQuery(""); // Clear search when opening dialog
    setSelectedCouponId(null); // Reset selected coupon
  };

  const handleConfirmSelection = () => {
    if (!selectedCouponId) {
      toast.error("Please select a coupon first");
      return;
    }

    // Apply the coupon directly without validation
    onApply(selectedCouponId);
    toast.success("Coupon applied successfully!");
    setIsDialogOpen(false);
  };

  // Filter coupons based on search query
  const filteredCoupons = coupons?.filter(coupon =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (coupon.description && coupon.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const isCouponValid = (coupon) => {
    // Check if coupon is active
    if (!coupon.active) return false;

    // Check if current date is within coupon validity
    const now = new Date();
    const startDate = new Date(coupon.startDate);
    const endDate = new Date(coupon.endDate);

    if (now < startDate || now > endDate) return false;

    // Check minimum purchase requirement
    if (coupon.minPurchase && cartTotal < coupon.minPurchase) return false;

    // Check total use limit
    if (coupon.totalUseLimit && coupon.totalUseLimit <= 0) return false;

    return true;
  };

  const getCouponDiscountText = (coupon) => {
    if (coupon.discountType === 'fixed') {
      return `₹${coupon.discountValue} OFF`;
    } else if (coupon.discountType === 'percentage') {
      return `${coupon.discountValue}% OFF`;
    }
    return 'Discount Available';
  };

  const getCouponValidityText = (coupon) => {
    const now = new Date();
    const endDate = new Date(coupon.endDate);
    const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) return 'Expired';
    if (daysLeft === 1) return 'Expires today';
    if (daysLeft <= 7) return `Expires in ${daysLeft} days`;
    return `Valid till ${endDate.toLocaleDateString()}`;
  };

  const getCouponStatus = (coupon) => {
    if (!isCouponValid(coupon)) {
      if (!coupon.active) return { status: 'Inactive', color: 'text-red-500' };
      if (new Date() < new Date(coupon.startDate)) return { status: 'Not started', color: 'text-blue-500' };
      if (new Date() > new Date(coupon.endDate)) return { status: 'Expired', color: 'text-red-500' };
      if (coupon.minPurchase && cartTotal < coupon.minPurchase) return { status: `Min ₹${coupon.minPurchase}`, color: 'text-orange-500' };
      if (coupon.totalUseLimit && coupon.totalUseLimit <= 0) return { status: 'Limit reached', color: 'text-red-500' };
    }
    return { status: 'Valid', color: 'text-green-500' };
  };

  return (
    <>
      <div className="p-4 border-b border-[#0000001A]">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-lg text-gray-800">Available Coupons</div>
          <button
            onClick={openDialog}
            className="flex items-center gap-2 px-3 py-2 bg-[#F59A11] text-white rounded-lg hover:bg-[#E58A00] transition-colors text-sm font-medium"
          >
            {appliedCoupon ? "Change" : "Select"} Coupon
          </button>
        </div>

        {appliedCouponData ? (
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-[#F59A11] mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <div className="font-medium text-gray-800 mb-1">
                  {appliedCouponData.code} - {getCouponDiscountText(appliedCouponData)}
                </div>
                <div className="text-gray-600">
                  Use code <span className="font-mono font-medium text-[#F59A11]">{appliedCouponData.code}</span>
                </div>
                {appliedCouponData.description && (
                  <div className="text-gray-600 text-sm mt-1">
                    {appliedCouponData.description}
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {getCouponValidityText(appliedCouponData)}
                  </span>
                  {appliedCouponData.minPurchase && (
                    <span className="flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      Min ₹{appliedCouponData.minPurchase}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-3 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">No coupon selected</p>
          </div>
        )}
      </div>

      {/* Coupon Selection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-0 w-full sm:max-w-lg h-[700px] flex flex-col">
          <DialogHeader className="px-6 py-3 bg-[#F59A111A] flex-shrink-0">
            <DialogTitle className="text-lg font-medium">Select Coupon</DialogTitle>
          </DialogHeader>

          {/* Search Bar */}
          <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search coupons by code or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#F59A11] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 min-h-0">
            <div className=" text-sm text-gray-500 mb-2">
              {searchQuery
                ? `${filteredCoupons.length} coupon${filteredCoupons.length !== 1 ? 's' : ''} found`
                : `Showing ${coupons?.length || 0} coupon${(coupons?.length || 0) !== 1 ? 's' : ''}`
              }
            </div>
            {filteredCoupons && filteredCoupons.length > 0 ? (
              <div className="space-y-2">
                {filteredCoupons.map((coupon) => {
                  const couponStatus = getCouponStatus(coupon);
                  const isValid = isCouponValid(coupon);

                  return (
                    <div
                      key={coupon._id}
                      className={`p-2.5 border rounded-lg transition-colors ${selectedCouponId === coupon._id
                          ? "border-[#F59A11] bg-[#FFF7E6]"
                          : isValid
                            ? "border-gray-200 hover:border-gray-300 cursor-pointer"
                            : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                        }`}
                      onClick={() => isValid && handleApplyCoupon(coupon._id)}
                    >
                      <div className="flex items-start gap-2.5">
                        {selectedCouponId === coupon._id ? (
                          <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#F59A11]" />
                        ) : (
                          <Tag className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isValid ? "text-gray-400" : "text-gray-300"
                            }`} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium text-gray-800 text-base">
                              {coupon.code} - {getCouponDiscountText(coupon)}
                            </div>
                            <span className={`text-sm font-medium ${couponStatus.color}`}>
                              {couponStatus.status}
                            </span>
                          </div>

                          <div className="text-sm text-gray-600 mb-1.5">
                            Use code <span className="font-mono font-medium text-[#F59A11]">{coupon.code}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {getCouponValidityText(coupon)}
                            </span>
                            {coupon.minPurchase && (
                              <span className="flex items-center gap-1">
                                <ShoppingBag className="w-3 h-3" />
                                Min ₹{coupon.minPurchase}
                              </span>
                            )}
                            {coupon.totalUseLimit && (
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {coupon.totalUseLimit} uses left
                              </span>
                            )}
                          </div>

                          {/* {coupon.autoApply && (
                            <div className="text-sm text-[#F59A11] font-medium mt-1">
                              ⚡ Auto-applied
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <Tag className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-base">
                  {searchQuery ? `No coupons found for "${searchQuery}"` : "No coupons available"}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-sm text-[#F59A11] underline mt-2 hover:text-[#E58A00]"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="p-3 border-t flex-shrink-0">
            <button
              onClick={handleConfirmSelection}
              disabled={!selectedCouponId}
              className="px-4 py-2 bg-[#F59A11] text-white rounded-lg hover:bg-[#E58A00] transition-colors w-full text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedCouponId ? "Confirm Selection" : "Select a Coupon"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartCouponSection;
