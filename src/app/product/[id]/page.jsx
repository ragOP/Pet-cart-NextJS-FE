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
import { apiService } from "@/app/apis/apiService";

const ProductPage = ({ params }) => {
  const { id } = React.use(params);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  const width = window.innerWidth;
  const type = width > 1024 ? "web" : (width > 768 ? "tablet" : "mobile");

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById({ id }),
    select: (res) => res?.response?.data || {},
  });

  const onCheckDelivery = async () => {
    setDeliveryLoading(true);
    const apiResponse = await apiService({
      endpoint: "api/delivery/check",
      method: "POST",
      data: {
        pincode: pincode,
        productId: id,
      },
    });
    if (apiResponse?.response?.success) {
      setExpectedDeliveryDate(apiResponse?.response?.data);
    } else {
      console.log(apiResponse, "apiResponse");
    }
    setDeliveryLoading(false);
  }

  const onSelectVariant = (variantId) => {
    // Toggle the selected variant - if clicking the same variant, set to null to show original product
    setSelectedVariant(prevVariant => prevVariant === variantId ? null : variantId);
    setSelectedImage(0);
  };

  const currentVariant =
    data.variants?.find((variant) => variant._id === selectedVariant) || {};

    const currentImages = [
      ...(currentVariant.images?.length ? currentVariant.images : data.images || []),
    ];

  const mainImage = currentImages[selectedImage] || currentImages[0];

  useEffect(() => {
    // setSelectedVariant(data.variants?.[0]?._id || null);
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
        category={data.categoryId}
        subCategory={data.subCategoryId}
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
            selectedVariant={selectedVariant}
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
            <div className="text-[#181818] underline">{data.brandId?.name}</div>
            <h1 className="text-2xl font-bold text-[#181818]">{data.title}</h1>
          </div>

          <Variants
            variants={data.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={(variantId) => onSelectVariant(variantId)}
          />

          <PriceAndCartDisplay
            stock={currentVariant.stock || data.stock}
            price={currentVariant.price || data.price}
            salePrice={currentVariant.salePrice || data.salePrice}
            productId={data._id}
            variantId={selectedVariant}
            quantity={1}
            />

          <PurchaseSection
            pincode={pincode}
            onPincodeChange={setPincode}
            onCheckDelivery={onCheckDelivery}
            expectedDeliveryDate={expectedDeliveryDate}
            onAddToCart={() => {}}
            deliveryLoading={deliveryLoading}
          />
        </div>
      </div>

      <ProductAccordion
        items={[
          {
            title: "Product Details",
            content: data.description,
          },
          {
            title: "Additional Information",
            content: "Additional information content goes here.",
          },
          // {
          //   title: "Product Details",
          //   content: "Another product details section.",
          // },
        ]}
      />

      <HandPickedProducts />

      <div className="px-4 mb-4">
        <CategoryBanner type={type} />
      </div>

      <HandPickedProducts />

      <ProductReviews />
    </div>
  );
};

export default ProductPage;
