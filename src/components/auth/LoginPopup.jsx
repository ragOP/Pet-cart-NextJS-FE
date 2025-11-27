"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
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
import paw from "@/assets/paw.png";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuth } from "@/store/authSlice";
import {
  selectLoginRedirectUrl,
  setLoginRedirectUrl,
  closeLoginPopup,
} from "@/store/uiSlice";
import { sendOtp } from "@/app/apis/sendOtp";
import { loginUser } from "@/app/apis/loginUser";
import { updateProfile } from "@/app/apis/updateProfile";
import { addProductToCart } from "@/app/apis/addProductToCart";
import { useQueryClient } from "@tanstack/react-query";
import heart from "@/assets/heart.png";

const LoginPopup = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ phoneNumber: "", otp: "", email: "", referralCode: "" });
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [otpLoading, setOtpLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(null);
  const dispatch = useDispatch();
  const redirectUrl = useSelector(selectLoginRedirectUrl);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Load referral code from sessionStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refCode = sessionStorage.getItem('referralCode');
      if (refCode) {
        setForm(prev => ({ ...prev, referralCode: refCode }));
      }
    }
  }, []);

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
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phoneNumber)) {
      toast.error("Enter a valid 10-digit phone number", {
        position: "top-right",
      });
      return;
    }
    setOtpLoading(true);
    try {
      const apiResponse = await sendOtp({
        phoneNumber: form.phoneNumber,
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
      }
    } catch (err) {
      toast.error("OTP Sending Failed", {
        description: err?.message || "OTP Sending failed",
        position: "top-right",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.otp) {
      toast.error("Enter the OTP sent to your phone", {
        position: "top-right",
      });
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

        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }

        if (data.isExisitinguser === true) {
          dispatch(setAuth({ token: data.token, user: data.user }));

          // Sync localStorage cart items after login
          syncLocalStorageCartItems(data.token);

          toast.success("Login Successful!", {
            description: "Welcome back to PetCaart.",
            position: "top-right",
          });
          setIsExistingUser(true);
          setTimeout(() => {
            const goto = redirectUrl || "/";
            router.push(goto);
            dispatch(setLoginRedirectUrl(null));
            dispatch(closeLoginPopup());
            onClose?.();
            resetForm();
          }, 1000);
        } else {
          setIsExistingUser(false);
          setStep(3);
        }
      } else {
        const msg =
          apiResponse?.message || apiResponse?.data?.message || "Login failed";
        toast.error("Login Failed", {
          description: msg,
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("Login Failed", {
        description: err?.message || "Login failed",
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    if (!form.email) {
      toast.error("Please enter your email address", {
        position: "top-right",
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
      });
      return;
    }
    setIsLoading(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        toast.error("Session expired. Please try again.", {
          position: "top-right",
        });
        return;
      }
      const apiResponse = await updateProfile({
        data: {
          email: form.email,
          ...(form.referralCode && { referralCode: form.referralCode }),
        },
        token: token,
      });

      if (apiResponse?.success) {
        const userData = apiResponse.data?.data || apiResponse.data;

        dispatch(setAuth({ token: token, user: userData }));

        // Sync localStorage cart items after registration
        syncLocalStorageCartItems(token);

        toast.success("Account Created!", {
          description: "Welcome to PetCaart.",
          position: "top-right",
        });
        // Clear referral code from session storage
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('referralCode');
        }
        setTimeout(() => {
          const goto = redirectUrl || "/";
          router.push(goto);
          dispatch(setLoginRedirectUrl(null));
          dispatch(closeLoginPopup());
          onClose?.();
          resetForm();
        }, 1000);
      } else {
        const msg =
          apiResponse?.message ||
          apiResponse?.data?.message ||
          "Registration failed";
        toast.error("Registration Failed", {
          description: msg,
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("Registration Failed", {
        description: err?.message || "Registration failed",
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || otpLoading) return;
    setOtpLoading(true);
    try {
      const apiResponse = await sendOtp({
        phoneNumber: form.phoneNumber,
      });
      if (apiResponse?.success) {
        toast.success("OTP Resent", {
          description: "Please check your phone for the OTP.",
          position: "top-right",
        });
        setCountdown(60);
      } else {
        toast.error("OTP Sending Failed", {
          description: apiResponse?.data?.message || "OTP Sending failed",
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("OTP Sending Failed", {
        description: err?.message || "OTP Sending failed",
        position: "top-right",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ phoneNumber: "", otp: "", email: "", referralCode: "" });
    setStep(1);
    setCountdown(0);
    setIsExistingUser(null);
    // Clear referral code from session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('referralCode');
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleStepClick = (targetStep) => {
    if (step === 3) return;
    if (targetStep >= step) return;
    if (targetStep === 1) {
      setForm({ ...form, otp: "" });
      setCountdown(0);
    }
    if (targetStep === 2) {
      setForm({ ...form, email: "" });
    }
    setStep(targetStep);
  };

  // Sync localStorage cart items to server cart
  const syncLocalStorageCartItems = async (token) => {
    try {
      const pendingCartItems = JSON.parse(localStorage.getItem('pendingCartItems') || '[]');

      if (pendingCartItems.length > 0) {
        // Add each pending item to cart
        const syncPromises = pendingCartItems.map((item) => {
          return addProductToCart({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          });
        });

        // Wait for all items to be added
        await Promise.all(syncPromises);

        // Clear localStorage after successful sync
        localStorage.removeItem('pendingCartItems');

        // Invalidate cart query to refresh cart data
        // queryClient.invalidateQueries({ queryKey: ["cart"] });

        toast.success("Items from your saved cart have been added!", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error syncing local cart:', error);
      // Don't show error to user, just log it
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogContent
          className="min-w-[70vw] min-h-[52vh] border-0 p-0 shadow-2xl bg-[#1F5163]"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Login to PetCaart</DialogTitle>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10 p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors bg-white/80 rounded-full backdrop-blur-sm"
          >
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>

          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:flex lg:w-[70%] h-full bg-[#1F5163] text-white relative overflow-hidden p-6 flex-col justify-center items-center rounded-2xl">
              <div className="w-full">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold leading-tight text-center">
                  Welcome to PetCaart
                </h1>
                <div className="flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-lg font-semibold text-center mt-2">
                    Your Pet's Happiness, Our Mission
                  </span>
                    <CustomImage
                      src={heart}
                      alt="Heart"
                      className="w-auto h-5 object-cover ml-1 mt-2"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
                  <div className="relative pb-8 bg-white/95 text-gray-900 rounded-xl shadow-xl pt-0 px-2 flex flex-col items-center justify-end">
                    <Image
                      src={curatedPng}
                      alt="Curated Care"
                      className="rounded-lg object-cover"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                        Curated Care
                      </div>
                      <div className="text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm text-[#f49911] leading-snug mt-1">
                        Handpicked essentials tailored to every pet's need.
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-3">
                      <Image
                        src={paw}
                        alt="Curated Care"
                        className="w-full h-[20px] object-cover"
                      />
                    </div>
                  </div>

                  <div className="relative pb-8 bg-white/95 text-gray-900 rounded-xl shadow-xl flex pt-0 px-2 flex-col items-center justify-end">
                    <Image
                      src={firstPng}
                      alt="Pet First"
                      className="rounded-lg object-cover"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base">Pet First</div>
                      <div className="text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm text-[#f49911] leading-snug mt-1">
                        Every choice designed for pets from heart.
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-3">
                      <Image
                        src={paw}
                        alt="Pet First"
                        className="w-full h-[20px] object-cover"
                      />
                    </div>
                  </div>

                  <div className="relative pb-8 bg-white/95 text-gray-900 rounded-xl shadow-xl pt-0 px-2 flex flex-col items-center justify-end">
                    <Image
                      src={easyPng}
                      alt="Easy Shop"
                      className=" object-cover"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base">Easy Shop</div>
                      <div className="text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm text-[#f49911] leading-snug mt-1">
                        Quick, simple, and seamless pet shopping anytime.
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-3">
                      <Image
                        src={paw}
                        alt="Easy Shop"
                        className="w-full h-[20px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[30%] lg:h-[95%] h-full bg-white lg:m-2 px-8 pt-28 md:pt-24 lg:pt-10 pb-6 flex flex-col justify-center font-gotham-rounded relative rounded-2xl">
              <div className="absolute top-5 left-0 right-0 flex justify-center">
                <div className="inline-flex items-center gap-2">
                  <CustomImage
                    src={petPng}
                    alt="PetCaart Logo"
                    className="h-24 md:h-18 lg:h-14 2xl:h-20 w-auto"
                    priority
                  />
                </div>
              </div>
              <div className="max-w-sm mx-auto w-full">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((stepNum) => (
                      <React.Fragment key={stepNum}>
                        <div
                          onClick={
                            step === 3
                              ? undefined
                              : () => handleStepClick(stepNum)
                          }
                          onKeyDown={
                            step === 3
                              ? undefined
                              : (e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    handleStepClick(stepNum);
                                  }
                                }
                          }
                          role="button"
                          tabIndex={step === 3 && stepNum < step ? -1 : 0}
                          aria-disabled={step === 3 && stepNum < step}
                          className={`w-8 h-8 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm font-semibold shadow-sm ${
                            stepNum <= step
                              ? "bg-[#1F5163] text-white"
                              : stepNum === step + 1 && isExistingUser === false
                              ? "bg-gray-200 text-gray-600"
                              : "bg-gray-100 text-gray-400"
                          } ${
                            stepNum < step
                              ? step === 3
                                ? "cursor-default pointer-events-none"
                                : "cursor-pointer hover:opacity-90"
                              : "cursor-default"
                          }`}
                        >
                          {stepNum}
                        </div>
                        {stepNum < 3 && (
                          <div
                            className={`w-12 md:w-10 h-[4px] rounded ${
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
                  className="space-y-6"
                >
                  {step === 1 && (
                    <div>
                      <label className="block text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium text-gray-700 mb-2">
                        Enter Mobile Number
                      </label>
                      <div className="flex">
                        <div className="flex items-center px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                          <span className="flex items-center">
                            <span className="text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium text-gray-700">
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
                          className="flex-1 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base border-l-0 rounded-l-none focus:ring-2 focus:ring-[#1F5163] focus:border-[#1F5163] border-gray-300 rounded-r-lg py-6"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <label className="block text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full focus:ring-2 focus:ring-[#1F5163] focus:border-[#1F5163] border-gray-300 rounded-lg py-3 text-center text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg tracking-widest"
                      />
                      {/* <p className="text-[10px] text-gray-500 mt-1 text-center">
                        Didn't receive the code? Check your SMS
                      </p> */}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full focus:ring-2 focus:ring-[#1F5163] focus:border-[#1F5163] border-gray-300 rounded-lg py-3 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg cursor-pointer"
                        />
                        <p className="text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm text-gray-500 mt-1 text-center">
                          We'll use this to send you exclusive & offers.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium text-gray-700 mb-2">
                          Referral Code <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <Input
                          type="text"
                          name="referralCode"
                          placeholder="Enter referral code (if any)"
                          value={form.referralCode}
                          onChange={handleChange}
                          className="w-full focus:ring-2 focus:ring-[#1F5163] focus:border-[#1F5163] border-gray-300 rounded-lg py-3 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg uppercase"
                          maxLength={20}
                        />
                        {form.referralCode && (
                          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Referral code will be applied
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#1F5163] text-white py-3 mb-0 rounded-lg font-semibold text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg hover:bg-[#1F5163]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer"
                    disabled={isLoading || otpLoading}
                  >
                    {step === 1 ? (
                      otpLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Sending OTP...
                        </span>
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

                  {step === 2 && (
                    <div className="text-center my-2">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={countdown > 0 || otpLoading}
                        className="text-[#1F5163] text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {countdown > 0
                          ? `Resend OTP in ${countdown}s`
                          : "Resend OTP"}
                      </button>
                    </div>
                  )}

                  <div className="text-center text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm text-gray-500 mt-1">
                    By continuing, you agree to our{" "}
                    <a href="/terms-and-policy" className="text-[#1F5163] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-[#1F5163] hover:underline">
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
