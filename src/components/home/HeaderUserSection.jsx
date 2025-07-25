"use client";

import { useSelector } from "react-redux";
import { selectToken } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import CustomImage from "@/components/images/CustomImage";
import loginLogo from "@/assets/login.png";
import { User } from "lucide-react";

export default function HeaderUserSection() {
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;
  const router = useRouter();

  return isLoggedIn ? (
    <button
      className="rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
      aria-label="Account"
      type="button"
      onClick={() => router.push('/account')}
    >
      <User size={22} />
    </button>
  ) : (
    <button
      className="bg-[#0888B1] uppercase text-white px-3 py-2 rounded text-sm font-medium flex items-center hover:bg-[#066b8a] focus:bg-[#05516a]"
      aria-label="Login"
      onClick={() => router.push('/auth/login')}
    >
      <CustomImage
        src={loginLogo}
        alt="loginlogo"
        className="h-4 w-auto mr-2"
        width={20}
        height={20}
      />
      Login
    </button>
  );
} 