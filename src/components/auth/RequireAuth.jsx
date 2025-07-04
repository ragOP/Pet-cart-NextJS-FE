"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectToken } from "@/store/authSlice";

export default function RequireAuth({ children }) {
  const token = useSelector(selectToken);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [token, router]);

  if (!token) return null;
  return children;
} 