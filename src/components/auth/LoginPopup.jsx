"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { X, Check } from "lucide-react";
import CustomImage from "@/components/images/CustomImage";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LoginPopup = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ phoneNumber: "", otp: "", email: "" });
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [otpLoading, setOtpLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifyChecked, setNotifyChecked] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(null);

  React.useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

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
      setStep(2);
      setCountdown(60);
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
      setStep(3);
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

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    if (!form.email) {
      setError("Please enter your email address");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    try {
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ phoneNumber: "", otp: "", email: "" });
    setError("");
    setStep(1);
    setCountdown(0);
    setNotifyChecked(false);
    setIsExistingUser(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogContent
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] !w-[60vw] !h-[70vh] !max-w-none border-0 p-0 shadow-2xl overflow-hidden rounded-2xl"
          showCloseButton={false}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-600 hover:text-gray-800 transition-colors bg-white/80 rounded-full backdrop-blur-sm"
          >
            <X size={20} />
          </button>

          <div className="flex h-full min-h-[500px]">
            <div className="w-[50%] relative overflow-hidden">
              <CustomImage
                src="/german-shephard-sitting.png"
                alt="Pet Login"
                className="w-full h-full object-cover"
                width={600}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#7D7098]/10 to-transparent"></div>
            </div>

            <div className="w-[50%] bg-white p-8 flex flex-col justify-center font-gotham-rounded">
              <div className="max-w-sm mx-auto w-full">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {step === 1
                      ? "Login / Signup"
                      : step === 2
                      ? "Verify OTP"
                      : "Complete Your Profile"}
                  </h2>
                  {step === 3 && (
                    <p className="text-sm text-gray-600 mt-2">
                      We need your email to complete your registration
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((stepNum) => (
                      <React.Fragment key={stepNum}>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            stepNum <= step
                              ? "bg-[#7D7098] text-white"
                              : stepNum === step + 1 && isExistingUser === false
                              ? "bg-gray-200 text-gray-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {stepNum}
                        </div>
                        {stepNum < 3 && (
                          <div
                            className={`w-8 h-1 rounded ${
                              stepNum < step ? "bg-[#7D7098]" : "bg-gray-200"
                            }`}
                          ></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={
                    step === 1
                      ? handleSendOtp
                      : step === 2
                      ? handleLogin
                      : handleCompleteRegistration
                  }
                  className="space-y-6"
                >
                  {step === 1 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter Mobile Number
                      </label>
                      <div className="flex">
                        <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                          <span className="flex items-center">
                            <span className="text-sm font-medium text-gray-700">
                              +91
                            </span>
                          </span>
                        </div>
                        <Input
                          type="tel"
                          name="phoneNumber"
                          placeholder="Enter Mobile Number"
                          value={form.phoneNumber}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                          className="flex-1 border-l-0 rounded-l-none focus:ring-2 focus:ring-[#7D7098] focus:border-[#7D7098] border-gray-300 rounded-r-lg py-5"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter OTP sent to +91 {form.phoneNumber}
                      </label>
                      <Input
                        type="text"
                        name="otp"
                        placeholder="Enter 6-digit OTP"
                        value={form.otp}
                        onChange={handleChange}
                        required
                        maxLength={6}
                        className="w-full focus:ring-2 focus:ring-[#7D7098] focus:border-[#7D7098] border-gray-300 rounded-lg py-3 text-center text-lg tracking-widest"
                      />
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Didn't receive the code? Check your SMS
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full focus:ring-2 focus:ring-[#7D7098] focus:border-[#7D7098] border-gray-300 rounded-lg py-3"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We'll use this to send you order updates and exclusive
                        offers
                      </p>
                    </div>
                  )}

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setNotifyChecked(!notifyChecked)}
                      className={`flex items-center justify-center w-5 h-5 border-2 rounded mr-3 transition-colors ${
                        notifyChecked
                          ? "border-[#7D7098] bg-[#7D7098]"
                          : "border-gray-300 hover:border-[#7D7098]"
                      }`}
                    >
                      {notifyChecked && (
                        <Check size={14} className="text-white" />
                      )}
                    </button>
                    <span className="text-sm text-gray-700">
                      Notify me for any updates & offers
                    </span>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#7D7098] text-white py-3 rounded-lg font-medium hover:bg-[#b1a0d2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    disabled={
                      isLoading || otpLoading || (step === 1 && countdown > 0)
                    }
                  >
                    {step === 1 ? (
                      otpLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Sending OTP...
                        </span>
                      ) : countdown > 0 ? (
                        `Resend OTP in ${countdown}s`
                      ) : (
                        "Send OTP"
                      )
                    ) : step === 2 ? (
                      isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Verifying...
                        </span>
                      ) : (
                        "Verify OTP"
                      )
                    ) : isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Creating Account...
                      </span>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>

                  <div className="text-center text-xs text-gray-500 mt-4">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-[#7D7098] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#7D7098] hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </div>

                  {step === 2 && (
                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setForm({ ...form, otp: "" });
                          setCountdown(0);
                          setError("");
                        }}
                        className="text-sm text-[#7D7098] hover:underline"
                      >
                        Change phone number?
                      </button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(2);
                          setForm({ ...form, email: "" });
                          setError("");
                        }}
                        className="text-sm text-[#7D7098] hover:underline"
                      >
                        ← Back to OTP verification
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default LoginPopup;
