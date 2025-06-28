"use client";

import React from "react";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-6 px-8 py-10">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 h-[80vh] overflow-y-auto">
        <AccountSidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 bg-white rounded-lg h-[80vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
