'use client';

import React, { useState } from "react";
import catIcon from "@/assets/cat.png";
import dogIcon from "@/assets/dog.png";
import pawIcon from "@/assets/pawicon.png";
import { ChevronDown } from "lucide-react";

// Importing breed images
import breed1 from "@/assets/breed/1.png";
import breed1Hover from "@/assets/breed/1.1.png";
import breed2 from "@/assets/breed/2.png";
import breed2Hover from "@/assets/breed/2.2.png";
import breed3 from "@/assets/breed/3.png";
import breed3Hover from "@/assets/breed/3.3.png";
import breed4 from "@/assets/breed/4.png";
import breed4Hover from "@/assets/breed/4.4.png";
import breed5 from "@/assets/breed/5.png";
import breed5Hover from "@/assets/breed/5.5.png";
import breed6 from "@/assets/breed/6.png";
import breed6Hover from "@/assets/breed/6.6.png";
import breed7 from "@/assets/breed/7.png";
import breed7Hover from "@/assets/breed/7.7.png";
import breed8 from "@/assets/breed/8.png";
import breed8Hover from "@/assets/breed/8.8.png";
import breed9 from "@/assets/breed/9.png";
import breed9Hover from "@/assets/breed/9.9.png";

function CategoryNavbar() {
  const [showCatOptions, setShowCatOptions] = useState(false);
  const [showDogOptions, setShowDogOptions] = useState(false);
  const [showShopByBreed, setShowShopByBreed] = useState(false);

  const breeds = [
    { name: "German Shepherd", img: breed1, hoverImg: breed1Hover },
    { name: "German Shepherd", img: breed2, hoverImg: breed2Hover },
    { name: "German Shepherd", img: breed3, hoverImg: breed3Hover },
    { name: "German Shepherd", img: breed4, hoverImg: breed4Hover },
    { name: "German Shepherd", img: breed5, hoverImg: breed5Hover },
    { name: "German Shepherd", img: breed6, hoverImg: breed6Hover },
    { name: "German Shepherd", img: breed7, hoverImg: breed7Hover },
    { name: "German Shepherd", img: breed8, hoverImg: breed8Hover },
    { name: "German Shepherd", img: breed9, hoverImg: breed9Hover },
  ];
  return (
    <>
      {/* Top Navigation */}
      <div className="bg-black text-white px-4 md:px-8 py-2 flex justify-end space-x-6 relative z-20">
        <div>
          <button
            onClick={() => {
              setShowCatOptions(!showCatOptions);
              setShowDogOptions(false);
              setShowShopByBreed(false);
            }}
            className="flex items-center space-x-1 "
          >
            <img src={catIcon} alt="Cats" className="h-5 w-5" />
            <span>
              Cats
              <ChevronDown className="inline-block h-4 w-4" />
            </span>
          </button>
        </div>

        <div>
          <button
            onClick={() => {
              setShowDogOptions(!showDogOptions);
              setShowCatOptions(false);
              setShowShopByBreed(false);
            }}
            className="flex items-center space-x-1"
          >
            <img src={dogIcon} alt="Dogs" className="h-5 w-5" />
            <span>
              Dogs
              <ChevronDown className="inline-block h-4 w-4" />
            </span>
          </button>
        </div>

        <div>
          <button
            onClick={() => {
              setShowShopByBreed(!showShopByBreed);
              setShowCatOptions(false);
              setShowDogOptions(false);
            }}
            className="text-sm"
          >
            Shop By Breed
            <ChevronDown className="inline-block h-4 w-4" />
          </button>
        </div>
      </div>

      {/*CAT DROPDOWN */}
      {showCatOptions && (
        <div className="absolute max-w-full md:left-4 bg-white rounded p-4 md:p-6 text-black shadow-lg">
          <h2 className="uppercase flex pb-4 font-gotham-rounded font-bold text-[24px] leading-[28.5px] tracking-[0.57px] align-middle">
            <img src={catIcon} alt="Cats" className="h-6 w-6 mr-2" />
            Categories
          </h2>
          <hr className="mb-4" />
          <div className="flex flex-col md:grid md:grid-cols-6 md:gap-6 text-sm">
            {/* Cat Food Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Cat Food
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Cat Litter Supplies Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Cat Litter Supplies
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Scoopers
                  </p>
                </div>
              </div>
            </div>

            {/* Cat Walk & Travel Supplies Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Cat Walk & Travel Supplies
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Bowls & Feeders Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Bowls & Feeders
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Cat Clothing Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Cat Clothing
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Cat Clothing Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Cat Treats
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Cat Toys Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Cat Toys
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*DOG DROPDOWN*/}
      {showDogOptions && (
        <div className="absolute max-w-full md:left-4 bg-white rounded p-4 md:p-6 text-black shadow-lg">
          <h2 className="uppercase flex pb-4 font-gotham-rounded font-bold text-[24px] leading-[28.5px] tracking-[0.57px] align-middle">
            <img src={dogIcon} alt="Dogs" className="h-6 w-6 mr-2" />
            Categories
          </h2>
          <hr className="mb-4" />
          <div className="flex flex-col md:grid md:grid-cols-6 md:gap-6 text-sm">
            {/* Cat Food Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Dog Food
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Dog Litter Supplies Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Dog Litter Supplies
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Scoopers
                  </p>
                </div>
              </div>
            </div>

            {/* Dog Walk & Travel Supplies Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Dog Walk & Travel Supplies
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Bowls & Feeders Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Bowls & Feeders
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Dog Clothing Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Dog Clothing
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Dog Clothing Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Dog Treats
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>

            {/* Dog Toys Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[20px] leading-[28.5px] tracking-[0.57px] align-middle">
                Dog Toys
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Wet Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Kitten Food
                  </p>
                </div>
                <div className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1">
                  <img
                    src={pawIcon}
                    alt="paw"
                    className="w-4 h-4 hidden group-hover:inline"
                  />
                  <p className="font-gotham-rounded font-normal text-[16px] leading-[28.5px] tracking-[0.57px] align-middle group-hover:font-medium">
                    Premium Food
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*SHOW BREEDS*/}
      {showShopByBreed && (
        <div className="top-full left-0 bg-white shadow-lg p-6 z-10">
          <div className="overflow-x-auto">
            <div className="flex gap-6 w-max">
              {breeds.map((breed, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-28 group cursor-pointer relative"
                >
                  {/* Circular Thumbnail */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 z-10">
                    <img
                      src={breed.img}
                      alt={breed.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Full Hover Image */}
                  <img
                    src={breed.hoverImg}
                    alt={`${breed.name} Hover`}
                    className="absolute w-32 h-36 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out -top-6 z-20"
                  />

                  <p className="text-center text-sm mt-2 z-30">{breed.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryNavbar;
