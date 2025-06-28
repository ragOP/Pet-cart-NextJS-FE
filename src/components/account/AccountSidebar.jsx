"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  MapPin,
  Package,
  Users,
  Heart,
  Headphones,
  LogOut,
} from "lucide-react";
import CustomImage from "../images/CustomImage";

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
    title: "Invite Friends",
    icon: Users,
    href: "/account/invite",
  },
  {
    title: "My Wishlist",
    icon: Heart,
    href: "/account/wishlist",
  },
  {
    title: "Contact Us",
    icon: Headphones,
    href: "/account/contact",
  },
  {
    title: "Log Out",
    icon: LogOut,
    href: "/logout",
  },
];

const AccountSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white border border-[#F59A1180] rounded-lg ">
      {/* User Info */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
          <CustomImage
            src="https://via.placeholder.com/48"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-medium">Karan Patil</h3>
          <p className="text-sm text-gray-500">
            PetCaart member since Jan-2022
          </p>
        </div>
      </div>

      <div className=" border-b border-[#F59A1180]" />

      {/* Navigation */}
      <nav className="">
        <ul className="divide-y divide-gray-200">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="last:border-b-0">
                <Link
                  href={item.href}
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
    </div>
  );
};

export default AccountSidebar;
