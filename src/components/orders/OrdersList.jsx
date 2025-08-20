import React from "react";
import { ChevronRight } from "lucide-react";
import CustomImage from "../images/CustomImage";
import "../../styles/hide-scrollbar.css";

function OrderListItem({ order, onOrderClick, index }) {
  const getStatusBadge = (status) => {
    const statusStyles = {
      DELIVERED: {
        circle: "bg-[#218032]",
        text: "text-[#218032]",
        border: "border-[#21803233] bg-[#21803233]",
        shadow: "0px 0px 9.3px 1.5px #218032",
      },
      CANCELLED: {
        circle: "bg-red-500",
        text: "text-red-800",
        border: "border-[#F7351833] bg-[#F7351833]",
        shadow: "0px 0px 9.3px 1.5px #F73518",
      },
      "IN PROGRESS": {
        circle: "bg-[#0888B1]",
        text: "text-[#0888B1]",
        border: "border-[#0888B133] bg-[#0888B133]",
        shadow: "0px 0px 9.3px 1.5px #0888B1",
      },
    };
    const style = statusStyles[status] || statusStyles["IN PROGRESS"];
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${style.border}`}
      >
        <span
          className={`w-3 h-3 rounded-full block ${style.circle}`}
          style={{ boxShadow: style.shadow }}
        />
        <span className={style.text}>{status}</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className="bg-[#F59A110D] rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => onOrderClick(index)}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          {/* Product Image */}
          <div className="w-16 h-16 flex-shrink-0">
            <CustomImage
              src={order.items[0]?.productId?.images[0] || "/assets/applod/applod-jar.png"}
              alt={order.items[0]?.productId?.title}
              className="w-full h-full object-contain rounded-md"
              width={64}
              height={64}
            />
          </div>

          {/* Order Details */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="overflow-hidden">
                <p className="text-sm text-gray-600 truncate">
                  Order ID:{" "}
                  <span className="font-semibold text-blue-600">
                    {order.orderId}
                  </span>
                  <span className="mx-2">|</span>
                  <span>{formatDate(order.createdAt)}</span>
                  <span className="mx-2">|</span>
                  Quantity:{" "}
                  <span className="font-semibold text-blue-600">
                    {order.items.length}
                  </span>
                </p>
              </div>
              {getStatusBadge(order.status)}
            </div>

            <h3 className="text-base font-medium text-gray-900 mb-2 truncate">
              {order.items[0]?.productId?.title}
            </h3>

            <p className="text-sm text-gray-600 mb-2 truncate">
              Rs. {order?.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Arrow Icon */}
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
      </div>
    </div>
  );
}

const OrdersList = ({ orders, onOrderClick }) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 h-full max-h-full overflow-y-auto hide-scrollbar">
      {orders.map((order, index) => (
        <OrderListItem
          key={order._id}
          order={order}
          onOrderClick={onOrderClick}
          index={index}
        />
      ))}
    </div>
  );
};

export default OrdersList;
