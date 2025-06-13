'use client';

import { toast } from "react-toastify";

export const showToast = (message, type, theme) => {
  toast(message, { type: type, theme: theme });
};

// toast.success(res?.message, {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "light",
// });
