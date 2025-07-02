"use client";
import React, { useEffect, useState } from "react";
import Login from "@/components/auth/Login";
import { getCookie } from "@/utils/cookies/getCookie";

const RequireLogin = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!getCookie("token"));
  }, []);

  if (isLoggedIn === null) return null;
  
  if (!isLoggedIn) {
    return <Login showTitle={false} />;
  }
  return children;
};

export default RequireLogin;
