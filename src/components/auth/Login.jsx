"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/apis/loginUser";
import { setCookie } from "@/utils/cookies/setCookie";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Login = ({ onSuccess, showTitle = true }) => {
  const [form, setForm] = useState({ phoneNumber: "", otp: "" });
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response?.data?.success) {
        if (response?.data?.token) {
          setCookie("token", response.data.token, 7);
          toast.success("Login Successful!", {
            description: "Welcome back to PetCaart.",
            position: "top-right",
          });
          setTimeout(() => router.push("/account"), 1200);
        }
      } else {
        toast.error("Login Failed", {
          description: response?.data?.message || "Login failed",
          position: "top-right",
        });
      }
    },
    onError: (err) => {
      toast.error("Login Failed", {
        description: err?.message || "Login failed",
        position: "top-right",
      });
      setError(err?.message || "Login failed");
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phoneNumber)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    setForm({ ...form, otp: "" });
    setStep(2);
    toast.success("OTP sent!", {
      description: `OTP has been sent to +91-${form.phoneNumber}`,
      position: "top-right",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.otp) {
      setError("Enter the OTP sent to your phone");
      return;
    }

    mutation.mutate({ phoneNumber: form.phoneNumber, otp: form.otp });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl p-8 flex flex-col gap-6">
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
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
          disabled={step === 2}
        />

        {step === 2 && (
          <>
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              OTP
            </label>
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
          className="border text-white cursor-pointer border-[#F59A11] bg-[#F59A11] rounded-lg px-4 py-2 font-semibold hover:bg-[#d87f0c] hover:text-white transition-colors disabled:opacity-50"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loader border-t-2 border-white rounded-full w-4 h-4 animate-spin" />
              {step === 1 ? "Sending OTP..." : "Logging in..."}
            </span>
          ) : step === 1 ? (
            "Send OTP"
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
