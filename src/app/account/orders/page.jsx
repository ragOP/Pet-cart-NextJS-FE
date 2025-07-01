"use client";

import React, { useState } from "react";
import EmptyOrdersState from "@/components/orders/EmptyOrdersState";
import OrderDetailsDialog from "@/components/orders/OrderDetailsDialog";
import OrdersList from "@/components/orders/OrdersList";

const DUMMY_ORDERS = [
  {
    id: "2548514851",
    date: "10th MAY 2025",
    status: "DELIVERED",
    items: [
      {
        id: "1",
        name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
        brand: "Applod",
        size: "14x3Kg",
        discount: "10% OFF",
        price: 109,
        originalPrice: 121,
        image: "/assets/applod/applod-jar.png",
      },
    ],
    totalMrp: 121,
    couponDiscount: 0,
    discountOnMrp: 12,
    shippingCharges: 0,
    grandTotal: 109,
  },
  {
    id: "2548514852",
    date: "10th MAY 2025",
    status: "CANCELLED",
    items: [
      {
        id: "2",
        name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
        brand: "Applod",
        size: "14x3Kg",
        discount: "10% OFF",
        price: 109,
        originalPrice: 121,
        image: "/assets/applod/applod-jar.png",
      },
    ],
    totalMrp: 121,
    couponDiscount: 0,
    discountOnMrp: 12,
    shippingCharges: 0,
    grandTotal: 109,
  },
  {
    id: "2548514853",
    date: "10th MAY 2025",
    status: "IN PROGRESS",
    items: [
      {
        id: "3",
        name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
        brand: "Applod",
        size: "14x3Kg",
        discount: "10% OFF",
        price: 109,
        originalPrice: 121,
        image: "/assets/applod/applod-jar.png",
      },
    ],
    totalMrp: 121,
    couponDiscount: 0,
    discountOnMrp: 12,
    shippingCharges: 0,
    grandTotal: 109,
  },
  {
    id: "2548514854",
    date: "10th MAY 2025",
    status: "DELIVERED",
    items: [
      {
        id: "4",
        name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
        brand: "Applod",
        size: "14x3Kg",
        discount: "10% OFF",
        price: 109,
        originalPrice: 121,
        image: "/assets/applod/applod-jar.png",
      },
    ],
    totalMrp: 121,
    couponDiscount: 0,
    discountOnMrp: 12,
    shippingCharges: 0,
    grandTotal: 109,
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const handleOrderClick = (orderIndex) => {
    setSelectedOrder(orders[orderIndex]);
    setIsOrderDetailsOpen(true);
  };

  const handleCloseOrderDetails = () => {
    setIsOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white border border-[#F59A1180] h-[80vh] overflow-y-auto rounded-lg shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between mb-6 border-b border-[#F59A1180]">
        <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
        <button className="bg-[#F59A11] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#E08900] transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          TRACK ORDER
        </button>
      </div>

        {orders.length === 0 ? (
          <EmptyOrdersState />
        ) : (
          <OrdersList orders={orders} onOrderClick={handleOrderClick} />
        )}

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isOrderDetailsOpen}
          onClose={handleCloseOrderDetails}
        />
      )}
    </div>
  );
}
