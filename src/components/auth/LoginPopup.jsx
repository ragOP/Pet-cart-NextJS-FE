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
import paw from "@/assets/paw.png";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuth } from "@/store/authSlice";
import { sendOtp } from "@/app/apis/sendOtp";
import { loginUser } from "@/app/apis/loginUser";
import { updateProfile } from "@/app/apis/updateProfile";

const LoginPopup = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ phoneNumber: "", otp: "", email: "" });
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [otpLoading, setOtpLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

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
          toast.success("Login Successful!", {
            description: "Welcome back to PetCaart.",
            position: "top-right",
          });
          setIsExistingUser(true);
          setTimeout(() => {
            router.push("/");
            onClose?.();
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
        },
        token: token,
      });

      if (apiResponse?.success) {
        const userData = apiResponse.data?.data || apiResponse.data;

        dispatch(setAuth({ token: token, user: userData }));

        toast.success("Account Created!", {
          description: "Welcome to PetCaart.",
          position: "top-right",
        });
        setTimeout(() => {
          router.push("/");
          onClose?.();
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
    setForm({ phoneNumber: "", otp: "", email: "" });
    setStep(1);
    setCountdown(0);
    setIsExistingUser(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleStepClick = (targetStep) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogContent
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[95vw] lg:!w-[70vw] h-[57vh] lg:!h-[70vh] !max-w-none border-0 p-0 shadow-2xl overflow-hidden rounded-2xl bg-[#1F5163]"
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
                  <div className="relative pb-5 bg-white/95 text-gray-900 rounded-xl shadow-xl p-3 flex flex-col items-center">
                    <div className="w-full rounded-lg overflow-hidden">
                      <Image
                        src={curatedPng}
                        alt="Curated Care"
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-semibold text-sm">Curated Care</div>
                      <div className="text-[11px] text-[#f49911] leading-snug mt-1">
                        Handpicked essentials tailored to every pet’s need.
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

                  {/* Card 2 */}
                  <div className="relative pb-5 bg-white/95 text-gray-900 rounded-xl shadow-xl p-3 flex flex-col items-center">
                    <div className="w-full rounded-lg overflow-hidden">
                      <Image
                        src={firstPng}
                        alt="Pet First"
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-semibold text-sm">Pet First</div>
                      <div className="text-[11px] text-[#f49911] leading-snug mt-1">
                        Every choice designed for pets from heart.
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

                  {/* Card 3 */}
                  <div className="relative pb-5 bg-white/95 text-gray-900 rounded-xl shadow-xl p-3 flex flex-col items-center">
                    <div className="w-full rounded-lg overflow-hidden">
                      <Image
                        src={easyPng}
                        alt="Easy Shop"
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-semibold text-sm">Easy Shop</div>
                      <div className="text-[11px] text-[#f49911] leading-snug mt-1">
                        Quick, simple, and seamless pet shopping anytime.
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

                  <button
                    type="submit"
                    className="w-full bg-[#1F5163] text-white py-1.5 rounded-lg font-medium hover:bg-[#1F516] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer"
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
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={countdown > 0 || otpLoading}
                        className="text-[#1F5163] text-xs hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {countdown > 0
                          ? `Resend OTP in ${countdown}s`
                          : "Resend OTP"}
                      </button>
                    </div>
                  )}

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
