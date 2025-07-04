"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/authSlice";
import { registerUser } from "@/app/apis/registerUser";
import { updateProfile } from "@/app/apis/updateProfile";

const Register = ({ onSuccess, showTitle = true }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", otp: "" });
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      setError("Enter a valid email");
      return;
    }
    setForm({ ...form, otp: "" }); // Clear OTP
    setStep(2);
    toast.success("OTP sent!", {
      description: `OTP has been sent to +91-${form.phoneNumber}`,
      position: "top-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.otp) {
      setError("Enter the OTP sent to your phone");
      return;
    }
    setIsLoading(true);
    try {
      const apiResponse = await registerUser(form);
      if (apiResponse?.success) {
        const data = apiResponse?.data;
        localStorage.setItem('token', data.token);
        const updateProfileResponse = await updateProfile({ data: { name: `${form.firstName} ${form.lastName}`, email: form.email } });
        if(updateProfileResponse?.success){
          dispatch(setAuth({ token: data.token, user: updateProfileResponse?.data?.data }));
          toast.success("Registration Successful!", {
            description: "Welcome to PetCaart.",
            position: "top-right",
          });
          setTimeout(() => router.push("/account/address"), 1200);
        }else{
          toast.error("Registration Failed", {
            description: updateProfileResponse?.data?.message || "Registration failed",
            position: "top-right",
          });
          setError(updateProfileResponse?.data?.message || "Registration failed");
        }
      } else {
        toast.error("Registration Failed", {
          description: apiResponse?.data?.message || "Registration failed",
          position: "top-right",
        });
        setError(apiResponse?.data?.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Registration Failed", {
        description: err?.message || "Registration failed",
        position: "top-right",
      });
      setError(err?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
      {showTitle && (
        <h2 className="text-2xl font-bold text-[#F59A11] mb-2">
          Create your PetCaart Account
        </h2>
      )}
      <form
        onSubmit={step === 1 ? handleSendOtp : handleSubmit}
        className="flex flex-col gap-2"
      >
        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
          First Name
        </label>
        <Input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
        />

        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
          Last Name
        </label>
        <Input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
        />

        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
        />

        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-gray-700 mt-2"
        >
          Phone Number
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
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
                  setForm((prev) => ({ ...prev, otp: "" }));
                  setStep(1);
                }}
              >
                Edit Number
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
          className="bg-[#F59A11] mt-2 text-white rounded-lg px-4 py-2 font-semibold hover:bg-[#E58A00] transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loader border-t-2 border-white rounded-full w-4 h-4 animate-spin" />
              {step === 1 ? "Sending OTP..." : "Registering..."}
            </span>
          ) : step === 1 ? (
            "Send OTP"
          ) : (
            "Register"
          )}
        </button>
      </form>
      <div className="text-center text-sm mt-2 text-gray-600">
        Already a user?{" "}
        <Link
          href="/auth/login"
          className="text-[#F59A11] hover:underline font-semibold"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
