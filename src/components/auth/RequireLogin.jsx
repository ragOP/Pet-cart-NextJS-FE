"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openLoginPopup, setLoginRedirectUrl } from "@/store/uiSlice";
import { getCookie } from "@/utils/cookies/getCookie";

const RequireLogin = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedIn = !!getCookie("token");
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      try {
        const currentPath = window.location.pathname + window.location.search + window.location.hash;
        dispatch(setLoginRedirectUrl(currentPath));
      } catch (_) {}
      router.replace("/");
      dispatch(openLoginPopup({}));
    }
  }, [router, dispatch]);

  if (isLoggedIn === null) return null;
  if (!isLoggedIn) return null;
  return children;
};

export default RequireLogin;
