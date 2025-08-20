"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/authSlice";
import { loginUser } from "@/app/apis/loginUser";
import { sendOtp } from "@/app/apis/sendOtp";

const Login = ({ onSuccess, showTitle = true }) => {
  const [form, setForm] = useState({ phoneNumber: "", otp: "" });
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [otpLoading, setOtpLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phoneNumber)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    setOtpLoading(true);
    try {
      const apiResponse = await sendOtp({
        phoneNumber: form.phoneNumber,
        origin: "login",
      });
      if (apiResponse?.success) {
        toast.success("OTP Sent Successfully!", {
          description: "Please check your phone for the OTP.",
          position: "top-right",
        });
        setForm({ ...form, otp: "" });
        setStep(2);
        setCountdown(60);
      } else {
        toast.error("OTP Sending Failed", {
          description: apiResponse?.data?.message || "OTP Sending failed",
          position: "top-right",
        });
        setError(apiResponse?.data?.message || "OTP Sending failed");
      }
    } catch (err) {
      toast.error("OTP Sending Failed", {
        description: err?.message || "OTP Sending failed",
        position: "top-right",
      });
      setError(err?.message || "OTP Sending failed");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.otp) {
      setError("Enter the OTP sent to your phone");
      return;
    }
    setIsLoading(true);
    try {
      const apiResponse = await loginUser({
        phoneNumber: form.phoneNumber,
        otp: form.otp,
      });
      if (apiResponse?.success) {
        const data = apiResponse.data;
        dispatch(setAuth({ token: data.token, user: data.user }));
        localStorage.setItem("token", data.token);
        toast.success("Login Successful!", {
          description: "Welcome back to PetCaart.",
          position: "top-right",
        });
        const redirectTo = searchParams.get("redirect") || "/account";
        setTimeout(() => router.push(redirectTo), 1200);
      } else {
        toast.error("Login Failed", {
          description: apiResponse?.message || "Login failed",
          position: "top-right",
        });
        setError(apiResponse?.message || "Login failed");
      }
    } catch (err) {
      toast.error("Login Failed", {
        description: err?.message || "Login failed",
        position: "top-right",
      });
      setError(err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl px-8 py-12 flex flex-col gap-6">
      {showTitle && (
        <h2 className="text-2xl font-bold text-[#F59A11] mb-2 text-center">
          Login to PetCaart
        </h2>
      )}
      <form
        onSubmit={step === 1 ? handleSendOtp : handleLogin}
        className="flex flex-col gap-4"
      >
        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-900 text-sm">+91</span>
          </div>
          <Input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            placeholder="Enter your 10-digit phone number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            maxLength={10}
            className="border border-gray-300 rounded-lg pl-12 pr-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
            disabled={step === 2}
          />
        </div>

        {step === 2 && (
          <>
            <div className="flex items-center justify-between mt-2">
              <label
                htmlFor="otp"
                className="text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <button
                type="button"
                className="text-xs text-[#F59A11] underline hover:text-[#E58A00] ml-2"
                onClick={() => {
                  setStep(1);
                  setForm({ ...form, otp: "" });
                }}
              >
                Resend OTP
              </button>
            </div>
            <Input
              id="otp"
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              required
              maxLength={6}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
            />
          </>
        )}

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          className="border text-white cursor-pointer border-[#F59A11] bg-[#F59A11] rounded-lg px-4 py-2 font-semibold hover:bg-[#d87f0c] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || otpLoading || (step === 1 && countdown > 0)}
        >
          {step === 1 ? (
            otpLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loader border-t-2 border-white rounded-full w-4 h-4 animate-spin" />
                Sending OTP...
              </span>
            ) : countdown > 0 ? (
              <span className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium">Resend OTP in {formatTime(countdown)}</span>
              </span>
            ) : (
              "Send OTP"
            )
          ) : isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loader border-t-2 border-white rounded-full w-4 h-4 animate-spin" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="text-center text-sm mt-2 text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-[#F59A11] hover:underline font-semibold"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
