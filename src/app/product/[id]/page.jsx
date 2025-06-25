"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { getProductById } from "@/helpers/home";
import { Heart, Star } from "lucide-react";
import ImageGallery from "@/components/product/ImageGallery";
import Variants from "@/components/product/Variants";
import PriceDisplay from "@/components/product/PriceDisplay";
import PurchaseSection from "@/components/product/PurchaseSection";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";

const ProductPage = ({ params }) => {
  const { id } = React.use(params);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById({ id }),
    select: (res) => res?.response?.data || {},
  });
  console.log("Product Data:", data);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PrimaryLoader />
      </div>
    );
  if (isError || !data) return <PrimaryEmptyState title="Product not found" />;

  const currentVariant = data.variants?.[selectedVariant] || {};
  const currentImages = currentVariant.images?.length
    ? currentVariant.images
    : data.images || [];
  const mainImage =
    currentImages[selectedImage] || currentImages[0] || data.images?.[0];

  console.log("Selected Image Index:", selectedImage);
  console.log("Current Images:", currentImages);
  console.log("Main Image:", mainImage);

  return (
    <div className="w-full p-4">
      <ProductBreadcrumb
        category={data.categoryId?.name}
        subCategory={data.subCategoryId?.name}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          {data.isBestSeller && (
            <div className="absolute top-4 left-4 bg-[#5BC5E5] text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
              BESTSELLER
            </div>
          )}
          <ImageGallery
            images={currentImages}
            selectedImage={selectedImage}
            onSelect={(idx) => setSelectedImage(idx)}
          />
        </div>

        {/* Right: Product Details */}
        <div className="space-y-4">
          {/* Rating & Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {data.ratings?.average || "5.0"}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-blue-600 underline">
                {data.ratings?.count || "112"} Reviews
              </span>
            </div>
            <button className="ml-auto p-2 border border-orange-400 rounded-lg hover:bg-orange-50">
              <Heart className="w-5 h-5 text-orange-400" />
            </button>
          </div>

          {/* Brand */}
          <div className="text-gray-600">{data.brandId?.name}</div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>

          <Variants
            variants={data.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={(idx) => {
              setSelectedVariant(idx);
              setSelectedImage(0);
            }}
          />

          <PriceDisplay
            price={currentVariant.price || data.price}
            salePrice={currentVariant.salePrice || data.salePrice}
          />

          {/* Add to Cart & Delivery */}
          <PurchaseSection
            pincode={pincode}
            onPincodeChange={setPincode}
            onCheckDelivery={() => {/* TODO: handle check */}}
            onAddToCart={() => {/* TODO: handle add to cart */}}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
