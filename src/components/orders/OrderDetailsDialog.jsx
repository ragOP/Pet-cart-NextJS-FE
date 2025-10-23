import React from "react";
import { X, HelpCircle, MapPin, CreditCard, Package, Calendar, Weight } from "lucide-react";
import CustomImage from "@/components/images/CustomImage";
import { calculateDiscountPercent } from "@/helpers/product/calculateDiscountPercent";
import "../../styles/hide-scrollbar.css";

export default function OrderDetailsDialog({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              ORDER ID : {order.orderId}
            </h2>
            <p className={`text-sm ${getStatusColor(order.status)} font-medium`}>
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
              }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
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
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500 line-through">₹{item.productId.price}</span>
                  <span className="text-sm text-green-600 font-medium">
                    {calculateDiscountPercent(item.productId.price, item.price)}% Off
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                  <span className="font-semibold text-gray-900">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Address */}
        {order.address && (
          <div className="px-6 pb-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F59A11]" />
              DELIVERY ADDRESS
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-900">{order.address.name}</p>
              <p className="text-sm text-gray-600 mt-1">{order.address.mobile}</p>
              <p className="text-sm text-gray-600">{order.address.email}</p>
              <p className="text-sm text-gray-600 mt-2">
                {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p className="text-sm text-gray-600">{order.address.country}</p>
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className="px-6 pb-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#F59A11]" />
            PAYMENT INFORMATION
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Payment Method ID</span>
              <span className="text-sm font-medium text-gray-900 font-mono">{order.paymentMethod}</span>
            </div>
            {order.transcation && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Transaction ID</span>
                  <span className="text-sm font-medium text-gray-900 font-mono">{order.transcation.razorpayPaymentId}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Razorpay Order ID</span>
                  <span className="text-sm font-medium text-gray-900 font-mono">{order.transcation.razorpayOrderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Status</span>
                  <span className="text-sm font-medium text-green-600">
                    Success
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Information */}
        <div className="px-6 pb-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#F59A11]" />
            ORDER INFORMATION
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Order Date</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Order Weight</span>
              <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                <Weight className="w-3 h-3" />
                {order.weight} kg
              </span>
            </div>
            {order.shipRocketOrderId && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ShipRocket Order ID</span>
                <span className="text-sm font-medium text-gray-900">{order.shipRocketOrderId}</span>
              </div>
            )}
            {order.note && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-600">Order Note</span>
                <p className="text-sm font-medium text-gray-900 mt-1">{order.note}</p>
              </div>
            )}
          </div>
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

            {order.discountedAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Product Discount</span>
                <span className="text-green-600">- ₹{order.discountedAmount.toFixed(2)}</span>
              </div>
            )}

            {order.couponCode && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Coupon Discount ({order.couponCode})</span>
                <span className="text-green-600">- ₹{(order.rawPrice - order.discountedAmountAfterCoupon - order.walletDiscount).toFixed(2)}</span>
              </div>
            )}

            {order.walletDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Wallet Discount</span>
                <span className="text-green-600">- ₹{order.walletDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{order.discountedAmountAfterCoupon.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="text-gray-900">
                {order.shippingCost > 0 ? `₹${order.shippingCost.toFixed(2)}` : 'FREE'}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax & Charges</span>
              <span className="text-gray-900">₹{(order.totalAmount - order.discountedAmountAfterCoupon - (order.shippingCost || 0)).toFixed(2)}</span>
            </div>

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
