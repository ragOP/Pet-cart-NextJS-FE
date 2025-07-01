"use client";
import React from "react";
import Login from "@/components/auth/Login";

const RequireLogin = ({ children }) => {
  // Example: Replace with your actual auth logic
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");
  if (!isLoggedIn) {
    return <Login showTitle={false} />;
  }
  return children;
};

export default RequireLogin;
