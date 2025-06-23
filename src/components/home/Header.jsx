"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, MapPin } from "lucide-react";
import CustomImage from "@/components/images/CustomImage";
import cartIcon from "@/assets/cart.png";
import truckIcon from "@/assets/truck.png";
import petLogo from "@/assets/pet.png";
import loginLogo from "@/assets/login.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const suggestions = ["Dog Food", "Cat Food", "Helno", "Royal Canin"];
  const [index, setIndex] = useState(0);
  const searchInputRef = React.useRef(null);
  const menuRef = React.useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  const animatedPlaceholder = `Search "${suggestions[index]}"`;

  return (
    <div className="bg-[#FEF5E7] text-[#333] shadow px-4 py-4">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="p-2 hover:bg-gray-100 focus:bg-gray-200 rounded"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setIsMenuOpen((v) => !v);
              }}
            >
              <Menu size={24} />
            </button>
            <CustomImage
              src={petLogo}
              alt="PetCaart Logo"
              className="h-8 md:w-auto w-[130px]"
              width={130}
              height={32}
              priority
            />
          </div>
        </div>
        {isMenuOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            className="fixed top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-50"
          >
            <div className="flex flex-col space-y-4">
              <button
                className="flex items-center space-x-2 rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
                aria-label="Track Order"
                type="button"
              >
                <CustomImage
                  src={truckIcon}
                  alt="Delivery"
                  className="h-6 w-6"
                  width={24}
                  height={24}
                />
                <span>Track Order</span>
              </button>
              <button
                className="flex items-center space-x-2 rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
                aria-label="Cart"
                type="button"
              >
                <CustomImage
                  src={cartIcon}
                  alt="Cart"
                  className="h-6 w-6"
                  width={24}
                  height={24}
                />
                <span>Cart</span>
              </button>
              <button className="bg-[#00a3ff] text-white px-4 py-2 rounded text-sm font-medium flex items-center hover:bg-[#0090e0] focus:bg-[#007bb8]" aria-label="Login">
                <CustomImage
                  src={loginLogo}
                  alt="loginlogo"
                  className="h-4 w-auto mr-2"
                  width={20}
                  height={20}
                />
                Login
              </button>
            </div>
          </div>
        )}
        <div className="flex w-full mb-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder={animatedPlaceholder}
            className="bg-white w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none text-sm"
            aria-label="Search products"
          />
          <button className="bg-white px-4 py-2 border border-l-0 border-gray-300 rounded-r-md text-blue-500 flex items-center justify-center hover:bg-blue-50 focus:bg-blue-100" aria-label="Search">
            <Search size={18} />
          </button>
        </div>
        <div className="w-full relative">
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

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-wrap items-center justify-between gap-y-4">
        <div className="flex items-center flex-shrink-0">
          <CustomImage
            src={petLogo}
            alt="PetCaart Logo"
            className="h-10 w-auto"
            width={80}
            height={40}
            priority
          />
        </div>

        <div className="flex flex-row flex-1 items-center justify-center gap-4 mx-8">
          <div className="flex w-[500px]">
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

          <div className="w-[420px] relative">
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

        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            className="rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
            aria-label="Track Order"
            type="button"
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
          >
            <CustomImage
              src={cartIcon}
              alt="Cart"
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </button>
          <button className="bg-[#0888B1] uppercase text-white px-3 py-2 rounded text-sm font-medium flex items-center hover:bg-[#066b8a] focus:bg-[#05516a]" aria-label="Login">
            <CustomImage
              src={loginLogo}
              alt="loginlogo"
              className="h-4 w-auto mr-2"
              width={20}
              height={20}
            />
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
