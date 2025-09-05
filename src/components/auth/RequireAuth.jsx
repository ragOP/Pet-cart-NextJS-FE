"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectToken } from "@/store/authSlice";
import { openLoginPopup, setLoginRedirectUrl } from "@/store/uiSlice";

export default function RequireAuth({ children }) {
  const token = useSelector(selectToken);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      try {
        const currentPath = window.location.pathname + window.location.search + window.location.hash;
        dispatch(setLoginRedirectUrl(currentPath));
      } catch (_) {}
      router.replace("/");
      dispatch(openLoginPopup({}));
    }
  }, [token, router, dispatch]);

  if (!token) return null;
  return children;
}
