import axios from "axios";
import { store } from "@/store/store";
import { clearAuth } from "@/store/authSlice";

// const BACKEND_URL = "https://pet-caart-be.onrender.com";
process.env.NEXT_PUBLIC_BACKEND_URL;

export const apiService = async ({
  endpoint,
  method = "GET",
  data,
  params,
  token: _token, // Only use if explicitly passed
  headers = {},
  customUrl,
  removeToken = false,
  signal,
}) => {
  try {
    // Get token from Redux (window.__PRELOADED_STATE__ or window.store) or localStorage
    let token = _token;
    if (!token && typeof window !== "undefined") {
      // Try Redux store
      try {
        const state = window.__PRELOADED_STATE__ || window.store?.getState?.();
        if (state && state.auth && state.auth.token) {
          token = state.auth.token;
        }
      } catch {}
      // Fallback to localStorage
      if (!token) {
        token = localStorage.getItem("token");
      }
    }
    const requestHeaders = {
      "ngrok-skip-browser-warning": "true",
      ...headers,
    };
    if (!removeToken && token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
    const requestObj = {
      url: `${customUrl ? customUrl : BACKEND_URL}/${endpoint}`,
      method,
      params,
      data,
      headers: requestHeaders,
    };
    if (signal) {
      requestObj.signal = signal;
    }
    const { data: res } = await axios.request(requestObj);
    return { response: res };
  } catch (error) {
    // Auto logout on 401 Unauthorized
    if (error?.response?.status === 401) {
      store.dispatch(clearAuth());
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    console.error(error, "backend endpoint error");
    return { success: false, error: true, ...(error || {}) };
  }
};
