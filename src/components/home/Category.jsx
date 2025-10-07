"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import pawIcon from "@/assets/pawicon.png";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import {
  fetchCategories,
  fetchSubCategories,
  fetchBrands,
  fetchBreeds,
  fetchCollections,
} from "@/helpers/home";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const [showShopByCategory, setShowShopByCategory] = useState(false);
  const [showShopByBreed, setShowShopByBreed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMobileCategory, setSelectedMobileCategory] = useState(null);

  const paramInitialState = {
    page: 1,
    per_page: 50,
    search: "",
  };

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        categoriesData,
        subCategoriesData,
        brandsData,
        breedsData,
        collectionsData,
      ] = await Promise.all([
        fetchCategories(paramInitialState),
        fetchSubCategories(paramInitialState),
        fetchBrands(paramInitialState),
        fetchBreeds(paramInitialState),
        fetchCollections(paramInitialState),
      ]);
      setCategories(categoriesData?.data?.categories || []);
      setSubCategories(subCategoriesData?.data || []);
      setBrands(brandsData?.data || []);
      setBreeds(breedsData?.data || []);
      setCollections(collectionsData?.data || []);
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSectionsForCategory = useCallback(
    (categoryId) => {
      if (loading) {
        return Array(6)
          .fill(0)
          .map((_, i) => ({
            title: `Category ${i + 1}`,
            items: Array(3)
              .fill(0)
              .map((_, j) => `Item ${j + 1}`),
          }));
      }

      const subs = subCategories.filter((sub) => sub.categoryId === categoryId);

      return subs.map((sub) => {
        const mappedCollectionsName = collections
          .filter((col) => col.subCategoryId === sub._id)
          .map((col) => col.name);

        const mappedCollectionsSlug = collections
          .filter((col) => col.subCategoryId === sub._id)
          .map((col) => col.slug);

        return {
          title: sub.name,
          subCategorySlug: sub.slug,
          itemsSlug: mappedCollectionsSlug,
          items:
            mappedCollectionsName.length > 0
              ? mappedCollectionsName
              : ["No collections"],
          hasCollections: mappedCollectionsName.length > 0,
        };
      });
    },
    [subCategories, collections]
  );

  function MobileDropdown({ category, sections, onBack, onClick, onClose }) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={onBack} className="flex items-center text-gray-600">
            <ChevronRight className="w-6 h-6 rotate-180" />
            <span>Back</span>
          </button>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CustomImage
              src={category?.image}
              alt={category?.name}
              className="w-6 h-6 mr-2 rounded-full"
              width={24}
              height={24}
            />
            {category?.name}
          </h2>
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="font-medium mb-2 text-sm">{section.title}</h3>
              <div className="space-y-[0.45rem]">
                {section.items && section.items.map((item, itemIndex) => (
                  <div
                    key={item}
                    className={`flex items-center py-1 px-2 rounded-lg ${section.hasCollections ? 'cursor-pointer hover:text-[#CC7700] hover:font-[500] transition-all duration-200' : 'cursor-default text-gray-500'}`}
                    onClick={() => {
                      if (!section.hasCollections) return;
                      onClose();
                      // Pass both subcategory and collection slugs
                      const specificSlug = section?.itemsSlug?.[itemIndex];
                      const subCategorySlug = section?.subCategorySlug;
                      if (specificSlug && subCategorySlug) {
                        onClick([specificSlug], subCategorySlug);
                      }
                    }}
                  >
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="border-b border-gray-200" />
        </div>
      </div>
    );
  }

  function MobileBreedView({ onBack }) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={onBack} className="flex items-center text-gray-600">
            <ChevronRight className="w-6 h-6 rotate-180" />
            <span>Back</span>
          </button>
          <button onClick={onBack} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xl font-semibold mb-6">Shop By Breed</h2>
          <div className="grid grid-cols-2 gap-4">
            {loading
              ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Skeleton className="w-32 h-32 rounded-full" />
                    <Skeleton className="w-20 h-4 mt-2" />
                  </div>
                ))
              : breeds.map((breed) => (
                <Link
                  key={breed._id}
                  href={`/shop-by-breed/${breed.slug || breed.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <CustomImage
                    src={breed.image}
                    alt={breed.name}
                    className="w-32 h-32 rounded-full border-2 border-gray-200"
                    width={128}
                    height={128}
                  />
                  <p className="text-center text-sm mt-2 font-medium">
                    {breed.name}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }

  function MobileMenu({ onClose }) {
    return (
      <div className="fixed inset-0 bg-white z-40 flex flex-col animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category._id}
              className="flex items-center justify-between w-full p-4 hover:bg-gray-50 border-b"
              onClick={() => {
                setSelectedMobileCategory(category);
                setActiveCategoryId(category._id);
              }}
            >
              <div className="flex items-center">
                <CustomImage
                  src={category.image}
                  alt={category.name}
                  className="w-8 h-8 rounded-full mr-3"
                  width={32}
                  height={32}
                />
                <span>{category.name}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  function Dropdown({ icon, title, sections, onClose, onClick }) {
    useEffect(() => {
      function handleClick(e) {
        if (!e.target.closest(".petcaart-dropdown")) {
          onClose();
        }
      }
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [onClose]);

    return (
      <div className="absolute left-0 right-0 w-full bg-white rounded-b-lg p-4 md:p-6 text-black shadow-lg z-30 petcaart-dropdown">
        {/* <h2 className="uppercase flex pb-4 font-gotham-rounded font-bold text-2xl">
          <CustomImage
            src={icon}
            alt={title}
            className="h-10 w-10 mr-2 rounded-full object-cover"
            width={24}
            height={24}
          />
          {title}
        </h2> */}
        {/* <hr className="mb-4" /> */}
        <div className="flex flex-col md:grid md:grid-cols-5 md:gap-6 text-sm">
          {sections.map((section, index) => (
            <div className="mb-6 md:mb-0" key={section.title}>
              <h3 className="uppercase mb-2 font-bold text-lg leading-[22.5px] tracking-[0.57px]">
                {section.title}
              </h3>
              <div className="flex flex-col space-y-1">
                {section.items && section.items.map((item, itemIndex) => (
                  <div
                    key={`${section.title}-${item}`}
                    className={`flex items-center space-x-2  hover:font-[500] transition-all ${section.hasCollections ? 'cursor-pointer hover:text-[#CC7700] transition-colors duration-200' : 'cursor-default text-gray-500'}`}
                    onClick={() => {
                      if (!section.hasCollections) return;
                      onClose();
                      // Pass both subcategory and collection slugs
                      const specificSlug = section?.itemsSlug?.[itemIndex];
                      const subCategorySlug = section?.subCategorySlug;
                      if (specificSlug && subCategorySlug) {
                        onClick([specificSlug], subCategorySlug);
                      }
                    }}
                  >
                    <p className="text-sm text-nowrap">
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

  const handleCollectionClick = (collectionSlugs, subCategorySlug) => {
    // Handle both single slug and array of slugs
    const slug = Array.isArray(collectionSlugs) ? collectionSlugs[0] : collectionSlugs;

    // Build URL with both subcategory and collection slugs
    const params = new URLSearchParams();
    if (subCategorySlug) {
      params.set('subCategorySlug', subCategorySlug);
    }
    if (slug) {
      params.set('collectionSlug', slug);
    }

    router.push(`/category?${params.toString()}`);
  };

  return (
    <>
      {/* Desktop Container (handles hover leave to close dropdowns) */}
      <div
        className="md:block relative"
        onMouseLeave={(e) => {
          // Only close if mouse is leaving the entire container area
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX;
          const y = e.clientY;

          // Check if mouse is outside the container bounds
          if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            setShowShopByBreed(false);
            setShowShopByCategory(false);
          }
        }}
      >
        {/* Desktop Navigation */}
        <div className="lg:fixed top-[80px] left-0 right-0 z-40 overflow-x-auto bg-black hidden md:block">
          <div className="text-white px-8 py-2 relative z-20">
            <div className="flex justify-end space-x-6 min-w-max">
              {categories?.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <button
                    onMouseEnter={() => {
                      setActiveCategoryId(category._id);
                      setShowShopByCategory(true);
                      setShowShopByBreed(false);
                    }}
                    className="flex items-center justify-center space-x-1 hover:text-[#CC7700] focus:text-[#E08A00] cursor-pointer transition-colors outline-none"
                  >
                    {/* <CustomImage
                    src={category.image}
                    alt={category.name}
                    className={`${category.name === "Dogs" ? "h-7" : "h-6.5"} w-auto rounded-3xl`}
                    width={24}
                    height={24}
                  /> */}
                    <span className="text-lg">
                      {category.name}
                      <ChevronDown className="inline-block h-5 w-5 ml-1" />
                    </span>
                  </button>
                </div>
              ))}
              <button
                onMouseEnter={() => {
                  setShowShopByBreed(true);
                  setShowShopByCategory(false);
                }}
                className="text-lg hover:text-[#CC7700] transition-colors outline-none focus:text-[#E08A00] flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span className="text-lg">Shop By Breed</span>
                <ChevronDown className="inline-block h-5 w-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
        {/* Spacer to prevent content jump due to fixed nav (desktop only) */}
        <div className="hidden md:block h-10" />
      </div>

      {/* Mobile Navigation Trigger */}
      <div className="md:hidden sticky top-[68px] z-30 bg-black text-white px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 border border-white/30 py-2 px-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span className="text-sm font-medium">Categories</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Shop By Breed Button */}
          <button
            onClick={() => setShowShopByBreed(true)}
            className="flex items-center justify-center gap-2 flex-1 bg-[#F59A11] py-2 px-3 rounded-lg hover:bg-[#E08A00] transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <CustomImage
                src={pawIcon}
                alt="paw"
                className="w-3 h-3"
                width={12}
                height={12}
              />
            </div>
            <span className="text-sm font-medium">Shop By Breed</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Remove Shop By Breed from here */}
      {isMobileMenuOpen && (
        <MobileMenu
          onClose={() => {
            setIsMobileMenuOpen(false);
            setSelectedMobileCategory(null);
          }}
        />
      )}

      {selectedMobileCategory && (
        <MobileDropdown
          onClick={handleCollectionClick}
          category={selectedMobileCategory}
          sections={getSectionsForCategory(selectedMobileCategory._id)}
          onBack={() => setSelectedMobileCategory(null)}
          onClose={() => {
            setIsMobileMenuOpen(false);
            setSelectedMobileCategory(null);
          }}
        />
      )}

      {/* Shop By Breed - Mobile */}
      {showShopByBreed && !isMobileMenuOpen && (
        <div className="md:hidden">
          <MobileBreedView
            onBack={() => {
              setShowShopByBreed(false);
            }}
          />
        </div>
      )}

      {/* Desktop Dropdowns */}
      {showShopByCategory && activeCategoryId && !isMobileMenuOpen && (
        <div className="fixed top-[122px] left-0 right-0 z-40 bg-white shadow-lg">
          <div
            onMouseEnter={() => setShowShopByCategory(true)}
            onMouseLeave={() => setShowShopByCategory(false)}
          >
            <Dropdown
              icon={categories.find((category) => category._id === activeCategoryId)?.image}
              title="Categories"
              sections={getSectionsForCategory(activeCategoryId)}
              onClose={() => setShowShopByCategory(false)}
              onClick={handleCollectionClick}
            />
          </div>
        </div>
      )}

      {/* Shop By Breed - Desktop */}
      {showShopByBreed && (
        <div className="absolute left-0 right-0 w-full bg-white shadow-lg p-4 md:p-6 z-10">
          <div
            onMouseEnter={() => setShowShopByBreed(true)}
            onMouseLeave={() => setShowShopByBreed(false)}
          >
            <CustomCarousel
              className="max-w-full"
              itemClassName="flex flex-col items-center w-28 group cursor-pointer relative mx-auto"
              showArrows={true}
            >
              {loading
                ? Array(6)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="w-24 h-24" />)
                : breeds.map((breed) => (
                  <Link
                    key={breed._id}
                    href={`/shop-by-breed/${breed.slug || breed.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-center hover:scale-105 transition-transform cursor-pointer"
                  >
                    <CustomImage
                      src={breed.image}
                      alt={breed.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gray-200 mx-auto"
                      width={96}
                      height={96}
                    />
                    <p className="text-center text-sm mt-2 line-clamp-2">
                      {breed.name}
                    </p>
                  </Link>
                ))}
            </CustomCarousel>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
