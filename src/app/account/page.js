"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectToken } from "@/store/authSlice";

export default function AccountPage() {
  const router = useRouter();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      router.replace("/");
    } else {
      router.replace("/account/profile");
    }
  }, [token, router]);

  return null;
}
