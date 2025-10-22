"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  MapPin,
  Package,
  Users,
  Heart,
  Headphones,
  LogOut,
  Wallet,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CustomImage from "../images/CustomImage";
import { clearAuth } from "@/store/authSlice";
import { formatMemberSince } from "@/utils/formatMemberSince";

const menuItems = [
  {
    title: "Edit Profile",
    icon: User,
    href: "/account/profile",
  },
  {
    title: "Address Information",
    icon: MapPin,
    href: "/account/address",
  },
  {
    title: "My Orders",
    icon: Package,
    href: "/account/orders",
  },
  {
    title: "My Wallet",
    icon: Wallet,
    href: "/account/wallet",
  },
  {
    title: "Invite Friends",
    icon: Users,
    href: "/account/invite-friends",
  },
  {
    title: "Contact Us",
    icon: Headphones,
    href: "/account/contact-us",
  },
  {
    title: "Log Out",
    icon: LogOut,
    action: "logout-dialog",
  },
];

const AccountSidebar = ({ onItemClick }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(clearAuth());
    localStorage.removeItem('token');
    setLogoutOpen(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full bg-white border border-[#F59A1180] rounded-lg">
      {/* User Info */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
          <CustomImage
            src="https://via.placeholder.com/48"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <SidebarProfileNameBlock />
      </div>

      <div className="border-b border-[#F59A1180]" />

      {/* Navigation */}
      <nav>
        <ul className="divide-y divide-gray-200">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.action === "logout-dialog") {
              return (
                <li key={item.title} className="last:border-b-0">
                  <button
                    className="flex items-center gap-3 py-3 px-4 w-full text-left transition-colors hover:bg-orange-50"
                    onClick={() => setLogoutOpen(true)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.href} className="last:border-b-0">
                <Link
                  href={item.href}
                  onClick={onItemClick}
                  className={`flex items-center gap-3 py-3 px-4 transition-colors ${
                    isActive ? "bg-[#F59A11] text-white" : "hover:bg-orange-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="max-w-xs rounded-2xl p-6">
          <DialogTitle className="text-xl font-semibold mb-4">
            Log Out
          </DialogTitle>
          <p className="text-gray-600 mb-6">
            Are you sure you want to log out?
          </p>
          <div className="flex gap-4 justify-end">
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
              onClick={() => setLogoutOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-[#F59A11] text-white hover:bg-[#E58A00]"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountSidebar;

const SidebarProfileNameBlock = () => {
  const { selectUser } = require("@/store/authSlice");
  const user = useSelector(selectUser) || {};
  const name = user.name || "";
  const createdBy = user.createdAt || "";
  const walletBalance = user.walletBalance || 0;
  console.log(user);

  const memberSince = formatMemberSince(createdBy) || "Jan-2022";

  return (
    <div className="flex-1">
      <h3 className="font-medium">{name?.trim() || "User"}</h3>
      <p className="text-sm text-gray-500">
        PetCaart member since {memberSince}
      </p>
      {walletBalance > 0 && (
        <div className="mt-2 flex items-center gap-1.5 bg-gradient-to-r from-[#F59A11]/10 to-[#E08900]/10 px-2 py-1 rounded-md">
          <Wallet className="w-3.5 h-3.5 text-[#F59A11]" />
          <span className="text-xs font-semibold text-[#F59A11]">₹{walletBalance.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};
