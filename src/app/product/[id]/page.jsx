"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { getProductById } from "@/helpers/home";
import ImageGallery from "@/components/product/ImageGallery";
import Variants from "@/components/product/Variants";
import PriceAndCartDisplay from "@/components/product/PriceAndCartDisplay";
import PurchaseSection from "@/components/product/PurchaseSection";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import RatingReviews from "@/components/product/RatingReviews";
import ProductAccordion from "@/components/product/ProductAccordion";
import HandPickedProducts from "@/components/product/HandpickedProducts";
import CategoryBanner from "@/components/category/CategoryBanner";
import ProductReviews from "@/components/product/ProductReviews";

const ProductPage = ({ params }) => {
  const { id } = React.use(params);
  const [selectedVariant, setSelectedVariant] = useState(null);
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

  const onSelectVariant = (variantId) => {
    setSelectedVariant(variantId);
    setSelectedImage(0);
  };

  const currentVariant =
    data.variants?.find((variant) => variant._id === selectedVariant) || {};

  const currentImages = [
    ...(data.images || []),
    ...(currentVariant.images || []),
  ];
  const mainImage = currentImages[selectedImage] || currentImages[0];

  useEffect(() => {
    setSelectedVariant(data.variants?.[0]?._id || null);
    setSelectedImage(0);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PrimaryLoader />
      </div>
    );
  if (isError || !data) return <PrimaryEmptyState title="Product not found" />;

  return (
    <div className="w-full p-4 bg-[#FFFBF6]">
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
            onSelect={(idx) => {
              setSelectedImage(idx);
            }}
          />
        </div>

        {/* Right: Product Details */}
        <div className="space-y-4">
          {/* Rating & Reviews */}
          <RatingReviews
            averageRating={data.ratings?.average || "5.0"}
            reviewCount={data.ratings?.count || "112"}
          />

          {/* Brand */}

          <div className="space-y-2">
            <div className="text-gray-600 underline">{data.brandId?.name}</div>
            <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
          </div>

          <Variants
            variants={data.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={(variantId) => onSelectVariant(variantId)}
          />

          <PriceAndCartDisplay
            price={currentVariant.price || data.price}
            salePrice={currentVariant.salePrice || data.salePrice}
          />

          <PurchaseSection
            pincode={pincode}
            onPincodeChange={setPincode}
            onCheckDelivery={() => {}}
            onAddToCart={() => {}}
          />
        </div>
      </div>

      <ProductAccordion
        items={[
          {
            title: "Product Details",
            content: "Product details content goes here.",
          },
          {
            title: "Additional Information",
            content: "Additional information content goes here.",
          },
          {
            title: "Product Details",
            content: "Another product details section.",
          },
        ]}
      />

      <HandPickedProducts />

      <div className="px-4 mb-4">
        <CategoryBanner />
      </div>

      <HandPickedProducts />

      <ProductReviews />
    </div>
  );
};

export default ProductPage;
