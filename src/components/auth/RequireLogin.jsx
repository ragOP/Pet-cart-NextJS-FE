"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookies/getCookie";

const RequireLogin = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = !!getCookie("token");
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.replace("/auth/login");
    }
  }, [router]);

  if (isLoggedIn === null) return null;
  if (!isLoggedIn) return null;
  return children;
};

export default RequireLogin;
