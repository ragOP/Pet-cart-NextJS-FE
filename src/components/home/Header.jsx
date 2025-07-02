"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Menu, MapPin, X, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomImage from "@/components/images/CustomImage";
import cartIcon from "@/assets/cart.png";
import truckIcon from "@/assets/truck.png";
import petLogo from "@/assets/pet.png";
import loginLogo from "@/assets/login.png";

const MobileMenu = React.memo(({ 
  logo, 
  animatedPlaceholder, 
  menuRef, 
  setIsMenuOpen, 
  router 
}) => (
  <div
    ref={menuRef}
    className="fixed inset-0 bg-white z-50 flex flex-col"
    style={{ height: "100dvh" }}
  >
    <div className="flex items-center justify-between p-4 border-b">
      <button
        onClick={() => {
          router.push('/');
          setIsMenuOpen(false);
        }}
        className="hover:opacity-80 transition"
      >
        <CustomImage
          src={logo || petLogo}
          alt="PetCaart Logo"
          className="h-8 w-auto"
          width={120}
          height={32}
        />
      </button>
      <button
        onClick={() => setIsMenuOpen(false)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <X size={24} />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={animatedPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="relative">
          <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-600" />
          <input
            type="text"
            placeholder="Enter PINCODE to check delivery date"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <button 
          className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-xl transition"
          onClick={() => {
            router.push('/track-order');
            setIsMenuOpen(false);
          }}
        >
          <CustomImage src={truckIcon} alt="Track Order" className="h-6 w-6" width={24} height={24} />
          <span className="text-gray-700">Track Order</span>
        </button>
        <button 
          className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-xl transition"
          onClick={() => {
            router.push('/cart');
            setIsMenuOpen(false);
          }}
        >
          <CustomImage src={cartIcon} alt="Cart" className="h-6 w-6" width={24} height={24} />
          <span className="text-gray-700">Cart</span>
        </button>
      </div>
    </div>

    <div className="p-4 border-t">
      <button 
        className="bg-[#0888B1] w-full text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center space-x-2"
        onClick={() => {
          router.push('/auth/login');
          setIsMenuOpen(false);
        }}
      >
        <CustomImage src={loginLogo} alt="Login" className="h-4 w-auto" width={20} height={20} />
        <span>LOGIN / SIGNUP</span>
      </button>
    </div>
  </div>
));

MobileMenu.displayName = 'MobileMenu';

const Header = ({ logo }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const suggestions = ["Dog Food", "Cat Food", "Helno", "Royal Canin"];
  const [index, setIndex] = useState(0);
  const searchInputRef = React.useRef(null);
  const menuRef = React.useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [suggestions.length]);

  useEffect(() => {
    if (isMenuOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Check for token cookie on mount and on menu open
    const checkLogin = () => {
      if (typeof document !== "undefined") {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});
        setIsLoggedIn(!!cookies.token);
      }
    };
    checkLogin();
    // Listen for storage events (in case of login/logout in another tab)
    window.addEventListener('focus', checkLogin);
    return () => window.removeEventListener('focus', checkLogin);
  }, [isMenuOpen]);

  const animatedPlaceholder = `Search "${suggestions[index]}"`;

  return (
    <div className="bg-[#FEF5E7] text-[#333] shadow-sm sticky top-0 z-40 overflow-x-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-white/50 rounded-full transition"
          >
            <Menu size={24} />
          </button>

          <button
            onClick={() => router.push('/')}
            className="hover:opacity-80 transition"
          >
            <CustomImage
              src={logo || petLogo}
              alt="PetCaart Logo"
              className="h-8 w-auto"
              width={120}
              height={32}
            />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(prev => !prev)}
              className="p-2 hover:bg-white/50 rounded-full transition"
            >
              <Search size={22} />
            </button>
            <button 
              className="p-2 hover:bg-white/50 rounded-full transition relative"
              onClick={() => router.push('/cart')}
            >
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {showSearch && (
          <div className="px-4 pb-3 animate-in slide-in-from-top">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={animatedPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        {isMenuOpen && (
          <MobileMenu 
            logo={logo}
            animatedPlaceholder={animatedPlaceholder}
            menuRef={menuRef}
            setIsMenuOpen={setIsMenuOpen}
            router={router}
          />
        )}
      </div>

      {/* Desktop Layout - Responsive */}
      <div className="hidden md:flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="hover:opacity-80 transition"
          >
            <CustomImage
              src={logo || petLogo}
              alt="PetCaart Logo"
              className="h-10 w-auto"
              width={160}
              height={140}
              priority
            />
          </button>
        </div>

        {/* Responsive search + pincode: row on xl, column on smaller screens */}
        <div className="flex flex-1 items-center justify-center mx-8">
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 w-full max-w-3xl">
            <div className="flex w-full xl:w-[360px]">
              <input
                type="text"
                placeholder={animatedPlaceholder}
                className="bg-white w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none text-sm"
                aria-label="Search products"
              />
              <button className="bg-white px-4 py-2 border border-l-0 border-gray-300 rounded-r-md text-blue-500 flex items-center justify-center hover:bg-blue-50 focus:bg-blue-100" aria-label="Search">
                <Search size={18} />
              </button>
            </div>

            <div className="w-full xl:w-[420px] relative">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600"
              />
              <input
                type="text"
                placeholder="Enter PINCODE to check delivery date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm bg-white"
                aria-label="Enter PINCODE to check delivery date"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            className="rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
            aria-label="Track Order"
            type="button"
            onClick={() => router.push('/account/track-order')}
          >
            <CustomImage
              src={truckIcon}
              alt="Delivery"
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </button>
          <button
            className="rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
            aria-label="Cart"
            type="button"
            onClick={() => router.push('/cart')}
          >
            <CustomImage
              src={cartIcon}
              alt="Cart"
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </button>
          {isLoggedIn ? (
            <button
              className="rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
              aria-label="Account"
              type="button"
              onClick={() => router.push('/account')}
            >
              <User size={22} />
            </button>
          ) : (
            <button 
              className="bg-[#0888B1] uppercase text-white px-3 py-2 rounded text-sm font-medium flex items-center hover:bg-[#066b8a] focus:bg-[#05516a]" 
              aria-label="Login"
              onClick={() => router.push('/auth/login')}
            >
              <CustomImage
                src={loginLogo}
                alt="loginlogo"
                className="h-4 w-auto mr-2"
                width={20}
                height={20}
              />
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
