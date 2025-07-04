import { getCookie } from "@/utils/cookies/getCookie";
import axios from "axios";
// https://pet-caart-be.onrender.com
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const apiService = async ({
  endpoint,
  method = "GET",
  data,
  params,
  token: _token,
  headers = {},
  customUrl,
  removeToken = false,
  signal,
}) => {
  try {
    let token = getCookie("token") || null;

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
    console.error(error, "backend endpoint error");
    return { success: false, error: true, ...(error || {}) };
  }
};
