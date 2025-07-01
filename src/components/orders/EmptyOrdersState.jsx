import React from "react";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyOrdersState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Package className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No orders yet
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        You haven't placed any orders yet. Start shopping to see your orders here.
      </p>
      
      <button
        onClick={() => router.push('/')}
        className="bg-[#F59A11] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E08900] transition-colors"
      >
        Start Shopping
      </button>
    </div>
  );
}
