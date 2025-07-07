"use client";

import React, { useState } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import EmptyOrdersState from "@/components/orders/EmptyOrdersState";
import OrderDetailsDialog from "@/components/orders/OrderDetailsDialog";
import OrdersList from "@/components/orders/OrdersList";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/app/apis/getOrders";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import "@/styles/hide-scrollbar.css"

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    select: (res) => res?.data?.orders || [],
  });

  const handleOrderClick = (orderIndex) => {
    setSelectedOrder(orders[orderIndex]);
    setIsOrderDetailsOpen(true);
  };

  const handleCloseOrderDetails = () => {
    setIsOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <RequireAuth>
      <div className="bg-white border border-[#F59A1180] h-[80vh] overflow-y-auto rounded-lg shadow-sm hide-scrollbar">
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

        {isLoading ? (
          <PrimaryLoader />
        ) : orders.length === 0 ? (
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
    </RequireAuth>
  );
}
