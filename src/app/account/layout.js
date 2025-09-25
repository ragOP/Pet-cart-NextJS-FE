"use client";

import React, { useState } from "react";
import AccountSidebar from "@/components/account/AccountSidebar";
import { Menu, X, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function AccountLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on a sub-page (not the main account page)
  const isSubPage = pathname !== "/account/profile" && pathname !== "/account";

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isSubPage && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900">
            {isSubPage ? "Account Settings" : "My Account"}
          </h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Account Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-full overflow-y-auto">
              <AccountSidebar onItemClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-start justify-center gap-6 px-8 py-10">
        {/* Sidebar */}
        <div className="w-1/4 h-[80vh] overflow-y-auto">
          <AccountSidebar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 bg-white rounded-lg h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="bg-white rounded-lg mx-4 my-4 min-h-[calc(100vh-120px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
