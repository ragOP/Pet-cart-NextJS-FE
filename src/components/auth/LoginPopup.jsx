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
import Image from "next/image";
import easyPng from "@/assets/easy.png";
import firstPng from "@/assets/first.png";
import curatedPng from "@/assets/curated.png";
import petPng from "@/assets/pet.png";

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

  const handleStepClick = (targetStep) => {
    if (targetStep >= step) return; // only allow moving back
    if (targetStep === 1) {
      setForm({ ...form, otp: "" });
      setCountdown(0);
      setError("");
    }
    if (targetStep === 2) {
      setForm({ ...form, email: "" });
      setError("");
    }
    setStep(targetStep);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogContent
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[95vw] lg:!w-[70vw] h-[70vh] lg:!h-[70vh] !max-w-none border-0 p-0 shadow-2xl overflow-hidden rounded-2xl bg-[#1F5163]"
          showCloseButton={false}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-600 hover:text-gray-800 transition-colors bg-white/80 rounded-full backdrop-blur-sm"
          >
            <X size={20} />
          </button>

          <div className="flex h-full">
            <div className="hidden lg:flex lg:w-[65%] h-full bg-[#1F5163] text-white relative overflow-hidden p-6 flex-col justify-center items-center">
              <div className="max-w-[520px] mx-auto w-full">
                <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold leading-tight text-center">
                  Welcome to PetCaart
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-center mt-2">
                  Your Pet’s Happiness, Our Mission
                  <span className="ml-1">🧡</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {/* Card 1 */}
                  <div className="bg-white/95 text-gray-900 rounded-xl shadow-xl p-3 flex flex-col items-center">
                    <div className="w-full rounded-lg overflow-hidden">
                      <Image
                        src={curatedPng}
                        alt="Curated Care"
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-semibold">Curated Care</div>
                      <div className="text-[11px] text-gray-600 leading-snug mt-1">
                        Handpicked essentials tailored to every pet’s need.
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white/95 text-gray-900 rounded-xl shadow-xl p-3 flex flex-col items-center">
                    <div className="w-full rounded-lg overflow-hidden">
                      <Image
                        src={firstPng}
                        alt="Pet First"
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-semibold">Pet First</div>
                      <div className="text-[11px] text-gray-600 leading-snug mt-1">
                        Every choice designed for pets from heart.
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white/95 text-gray-900 rounded-xl shadow-xl p-3 flex flex-col items-center">
                    <div className="w-full rounded-lg overflow-hidden">
                      <Image
                        src={easyPng}
                        alt="Easy Shop"
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-semibold">Easy Shop</div>
                      <div className="text-[11px] text-gray-600 leading-snug mt-1">
                        Quick, simple, and seamless pet shopping anytime.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[35%] h[100%] bg-white lg:m-5 m-2 px-7 py-5 flex flex-col justify-center font-gotham-rounded relative rounded-2xl">
              <div className="absolute top-5 left-0 right-0 flex justify-center">
                <div className="inline-flex items-center gap-2">
                  <CustomImage
                    src={petPng}
                    alt="PetCaart Logo"
                    className="h-12 w-auto"
                    priority
                  />
                </div>
              </div>
              <div className="max-w-sm mx-auto w-full">
                {/* <div className="text-center mb-5 md:mb-6">
                  {/* <h2 className="text-sm md:text-base lg:text-lg font-bold text-gray-800">
                    Login / Signup
                  </h2> */}
                {/* {step === 3 && (
                    <p className="text-xs text-gray-600 mt-1.5 md:mt-2">
                      We need your email to complete your registration
                    </p>
                  )}
                </div> */}
                <div className="flex items-center justify-center mb-5">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((stepNum) => (
                      <React.Fragment key={stepNum}>
                        <div
                          onClick={() => handleStepClick(stepNum)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleStepClick(stepNum);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-semibold shadow-sm ${
                            stepNum <= step
                              ? "bg-[#1F5163] text-white"
                              : stepNum === step + 1 && isExistingUser === false
                              ? "bg-gray-200 text-gray-600"
                              : "bg-gray-100 text-gray-400"
                          } ${
                            stepNum < step
                              ? "cursor-pointer hover:opacity-90"
                              : "cursor-default"
                          }`}
                        >
                          {stepNum}
                        </div>
                        {stepNum < 3 && (
                          <div
                            className={`w-9 h-[4px] rounded ${
                              stepNum < step ? "bg-[#1F5163]" : "bg-gray-200"
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
                  className="space-y-5"
                >
                  {step === 1 && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Enter Mobile Number
                      </label>
                      <div className="flex">
                        <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                          <span className="flex items-center">
                            <span className="text-xs font-medium text-gray-700">
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
                          className="flex-1 border-l-0 rounded-l-none focus:ring-2 focus:ring-[#1F5163] focus:border-[#1F5163] border-gray-300 rounded-r-lg py-4"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
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
                        className="w-full focus:ring-2 focus:ring-[#1F5163] focus:border-[#1F5163] border-gray-300 rounded-lg py-2.5 text-center text-base tracking-widest"
                      />
                      <p className="text-[10px] text-gray-500 mt-1 text-center">
                        Didn't receive the code? Check your SMS
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full focus:ring-2 focus:ring-[#1F5163] focus:border-[#1F5163] border-gray-300 rounded-lg py-2.5 cursor-pointer"
                      />
                      <p className="text-[10px] text-gray-500 mt-1 text-center">
                        We'll use this to send you exclusive & offers.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setNotifyChecked(!notifyChecked)}
                      className={`flex items-center justify-center w-4 h-4 border-2 rounded mr-2 transition-colors ${
                        notifyChecked
                          ? "border-[#1F5163] bg-[#1F5163]"
                          : "border-gray-300 hover:border-[#1F5163]"
                      }`}
                    >
                      {notifyChecked && (
                        <Check size={11} className="text-white" />
                      )}
                    </button>
                    <span className="text-[11px] text-gray-700">
                      Notify me for any updates & offers
                    </span>
                  </div>

                  {error && (
                    <div className="text-red-500 text-xs bg-red-50 p-2.5 rounded-lg border border-red-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#1F5163] text-white py-1.5 rounded-lg font-medium hover:bg-[#1F516] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer"
                    disabled={
                      isLoading || otpLoading || (step === 1 && countdown > 0)
                    }
                  >
                    {step === 1 ? (
                      otpLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Verifying...
                        </span>
                      ) : (
                        "Verify OTP"
                      )
                    ) : isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Creating Account...
                      </span>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>

                  <div className="text-center text-[11px] text-gray-500 mt-1">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-[#1F5163] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#1F5163] hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </div>

                  {/* Bottom navigation links removed; users can click on step indicators to go back */}
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
