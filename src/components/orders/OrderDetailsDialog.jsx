import React from "react";
import { X, HelpCircle } from "lucide-react";
import CustomImage from "@/components/images/CustomImage";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import "../../styles/hide-scrollbar.css";

export default function OrderDetailsDialog({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600";
      case "CANCELLED":
        return "text-red-600";
      case "IN PROGRESS":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 overflow-y-auto hide-scrollbar">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              ORDER ID : {order.orderId}
            </h2>
            <p className={`text-sm ${getStatusColor(order.status)} font-medium`}>
              {order.status} | {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              <HelpCircle className="w-5 h-5" />
              {/* HELP */}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Item Details */}
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">ITEM DETAILS</h3>

          {order.items.map((item, index) => (
            <div key={item._id} className="flex gap-4 mb-6">
              <div className="w-16 h-16 flex-shrink-0">
                <CustomImage
                  src={item.productId.images[0]}
                  alt={item.productId.title}
                  className="w-full h-full object-contain rounded-md"
                  width={64}
                  height={64}
                />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                  {item.productId.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{item.productId.brand}</p>
                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {item.productId.size} | {calculateDiscountPercent(item.total + item.couponDiscount, item.price)}% Off
                  </span> */}
                  <span className="font-semibold text-gray-900">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Bill Details */}
        <div className="px-6 pb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            TOTAL ORDER BILL DETAILS
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total MRP Price</span>
              <span className="text-gray-900">₹{order.rawPrice.toFixed(2)}</span>
            </div>

            {order.couponDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Coupon Discount</span>
                <span className="text-gray-900">₹{order.couponDiscount}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Tax</span>
              <span className="text-gray-900">₹{(order.amountAfterTax.toFixed(2) - order.discountedAmountAfterCoupon.toFixed(2)).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Discount</span>
              <span className="text-green-600">- {""}₹{order.discountedAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping Charges</span>
              <span className="text-gray-900 font-medium">
              ₹{(order.totalAmount.toFixed(2) - order.amountAfterTax.toFixed(2)).toFixed(2)}
              </span>
            </div>

            {order.shippingCharges === 0 && (
              <p className="text-xs text-gray-500">To be applied at checkout</p>
            )}

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-gray-900">Grand Total</span>
                <span className="text-gray-900">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
