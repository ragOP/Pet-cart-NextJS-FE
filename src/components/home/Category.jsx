"use client";

import React, { useState } from "react";
import catIcon from "@/assets/cat.png";
import dogIcon from "@/assets/dog.png";
import pawIcon from "@/assets/pawicon.png";
import { ChevronDown } from "lucide-react";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";

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

function Category() {
  const [showCatOptions, setShowCatOptions] = useState(false);
  const [showDogOptions, setShowDogOptions] = useState(false);
  const [showShopByBreed, setShowShopByBreed] = useState(false);

  const breeds = [
    {
      name: "German Shepherd",
      img: breed1,
      hoverImg: breed1Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed2,
      hoverImg: breed2Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed3,
      hoverImg: breed3Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed4,
      hoverImg: breed4Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed5,
      hoverImg: breed5Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed6,
      hoverImg: breed6Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed7,
      hoverImg: breed7Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed8,
      hoverImg: breed8Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed9,
      hoverImg: breed9Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed6,
      hoverImg: breed6Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed7,
      hoverImg: breed7Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed6,
      hoverImg: breed6Hover,
      link: "/shop-by-breed",
    },
    {
      name: "German Shepherd",
      img: breed7,
      hoverImg: breed7Hover,
      link: "/shop-by-breed",
    },
  ];

  // Dropdown section data
  const catSections = [
    {
      title: "Cat Food",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Cat Litter Supplies",
      items: ["Wet Food", "Kitten Food", "Scoopers"],
    },
    {
      title: "Cat Walk & Travel Supplies",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Bowls & Feeders",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Cat Clothing",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Cat Treats",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Cat Toys",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
  ];
  const dogSections = [
    {
      title: "Dog Food",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Dog Litter Supplies",
      items: ["Wet Food", "Kitten Food", "Scoopers"],
    },
    {
      title: "Dog Walk & Travel Supplies",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Bowls & Feeders",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Dog Clothing",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Dog Treats",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
    {
      title: "Dog Toys",
      items: ["Wet Food", "Kitten Food", "Premium Food"],
    },
  ];

  function Dropdown({ icon, title, sections, onClose }) {
    // Close dropdown on outside click
    React.useEffect(() => {
      function handleClick(e) {
        if (e.target.closest(".petcaart-dropdown") === null) {
          onClose();
        }
      }
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [onClose]);
    return (
      <div
        className="absolute left-0 right-0 w-full bg-white rounded-b-lg p-4 md:p-6 text-black shadow-lg z-30 petcaart-dropdown"
        style={{ maxWidth: "100vw" }}
      >
        <h2 className="uppercase flex pb-4 font-gotham-rounded font-bold text-[24px] leading-[28.5px] tracking-[0.57px] align-middle">
          <CustomImage
            src={icon}
            alt={title}
            className="h-6 w-6 mr-2"
            width={24}
            height={24}
          />
          Categories
        </h2>
        <hr className="mb-4" />
        <div className="flex flex-col md:grid md:grid-cols-6 md:gap-6 text-sm">
          {sections.map((section) => (
            <div className="mb-6 md:mb-0" key={section.title}>
              <h3 className="uppercase mb-2 font-gotham-rounded font-medium text-[16px] leading-[22px] tracking-[0.57px] align-middle">
                {section.title}
              </h3>
              <div className="flex flex-col space-y-2">
                {section.items.map((item) => (
                  <div
                    className="group flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:translate-x-1"
                    key={item}
                  >
                    <CustomImage
                      src={pawIcon}
                      alt="paw"
                      className="w-4 h-4 hidden group-hover:inline"
                      width={16}
                      height={16}
                    />
                    <p className="font-gotham-rounded font-normal text-[12px] leading-[20px] tracking-[0.57px] align-middle group-hover:font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Navigation */}
      <div className="bg-black text-white px-4 md:px-8 py-2 flex justify-end space-x-6 relative z-20">
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCatOptions(!showCatOptions);
              setShowDogOptions(false);
              setShowShopByBreed(false);
            }}
            className="flex items-center space-x-1 hover:text-[#F59A11] focus:text-[#F59A11] transition-colors cursor-pointer outline-none focus:underline"
          >
            <CustomImage
              src={catIcon}
              alt="Cats"
              className="h-5 w-5"
              width={20}
              height={20}
            />
            <span>
              Cats
              <ChevronDown className="inline-block h-4 w-4" />
            </span>
          </button>
        </div>

        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDogOptions(!showDogOptions);
              setShowCatOptions(false);
              setShowShopByBreed(false);
            }}
            className="flex items-center space-x-1 mr-12 hover:text-[#F59A11] focus:text-[#F59A11] transition-colors cursor-pointer outline-none focus:underline"
          >
            <CustomImage
              src={dogIcon}
              alt="Dogs"
              className="h-5 w-5"
              width={20}
              height={20}
            />
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
            className="text-sm hover:text-[#F59A11] focus:text-[#F59A11] transition-colors cursor-pointer outline-none focus:underline"
          >
            Shop By Breed
            <ChevronDown className="inline-block h-4 w-4" />
          </button>
        </div>
      </div>

      {/*CAT DROPDOWN */}
      {showCatOptions && (
        <Dropdown
          icon={catIcon}
          title="Cats"
          sections={catSections}
          onClose={() => setShowCatOptions(false)}
        />
      )}
      {/*DOG DROPDOWN*/}
      {showDogOptions && (
        <Dropdown
          icon={dogIcon}
          title="Dogs"
          sections={dogSections}
          onClose={() => setShowDogOptions(false)}
        />
      )}

      {/*SHOW BREEDS*/}
      {showShopByBreed && (
        <div
          className="absolute left-0 right-0 w-full bg-white shadow-lg p-6 z-10"
          style={{ maxWidth: "100vw" }}
        >
          <CustomCarousel
            className="max-w-full"
            itemClassName="flex flex-col items-center w-28 group cursor-pointer relative mx-auto"
            contentClassName=""
            itemsToShow={5}
            showArrows={true}
          >
            {breeds.map((breed, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-28 group cursor-pointer relative mx-auto "
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 z-10">
                  <CustomImage
                    src={breed.img}
                    alt={breed.name}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
                <CustomImage
                  src={breed.hoverImg}
                  alt={`${breed.name} Hover`}
                  className="absolute w-32 h-36 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out -top-6 z-20"
                  width={128}
                  height={144}
                />
                <p className="text-center text-sm mt-2 z-30">{breed.name}</p>
              </div>
            ))}
          </CustomCarousel>
        </div>
      )}
    </>
  );
}

export default Category;
