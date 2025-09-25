"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { getProductById } from "@/helpers/home";
import ImageGallery from "@/components/product/ImageGallery";
import ProductVariants from "@/components/product/ProductVariants";
import PriceAndCartDisplay from "@/components/product/PriceAndCartDisplay";
import PurchaseSection from "@/components/product/PurchaseSection";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import RatingReviews from "@/components/product/RatingReviews";
import ProductAccordion from "@/components/product/ProductAccordion";
import HandPickedProducts from "@/components/product/HandpickedProducts";
import CategoryBanner from "@/components/category/CategoryBanner";
import ProductReviews from "@/components/product/ProductReviews";
import { getReviewsByProductId } from "@/app/apis/getReviewsByProductId";
import { checkDelivery } from "@/app/apis/checkDelivery";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { ArrowRight } from "lucide-react";

const ProductPage = ({ params }) => {
  const { id } = React.use(params);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const { deviceType, isClient } = useDeviceDetection();
  const type = deviceType === "desktop" ? "web" : (deviceType === "tablet" ? "tablet" : "mobile");

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById({ id }),
    select: (res) => res?.response?.data || {},
  });

  const additionalInformation = useMemo(() => {
    if (!data?.title) return null;

    return {
      productName: data?.title,
      productType: data?.productType,
      brand: data?.brandId?.name,
      netWeight: `${data?.weight}gm`,
      importedAndMarketedBy: data?.importedBy,
      origin: data?.countryOfOrigin,
      price: `₹${data?.price}`,
      discount: `${(((data?.price - data?.salePrice) / data?.price) * 100).toFixed(2)}%`,
      platform: "Pet Caart",
      subCategory: data?.subCategoryId?.name,
      category: data?.categoryId?.name,
      lifeStage: data?.lifeStage,
      disclaimer: "All Images are for representation purpose only, You are advised to read the batch details, manufacturer details, expiry date and other details mentioned on the product.",
    };
  }, [
    data?.title,
    data?.productType,
    data?.brandId?.name,
    data?.weight,
    data?.importedBy,
    data?.countryOfOrigin,
    data?.price,
    data?.salePrice,
    data?.subCategoryId?.name,
    data?.categoryId?.name,
    data?.lifeStage,
  ]);

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsByProductId({ id }),
    select: (res) => res?.response?.data || {},
  });

  const onCheckDelivery = async () => {
    setDeliveryLoading(true);
    try {
      const response = await checkDelivery({
        pincode: pincode,
        productId: id,
      });

      if (response?.success) {
        setExpectedDeliveryDate(response?.data || "Available for delivery");
      } else {
        console.log(response, "apiResponse");
        setExpectedDeliveryDate("Not available for delivery");
      }
    } catch (error) {
      console.error("Delivery check error:", error);
      setExpectedDeliveryDate("Error checking delivery");
    } finally {
      setDeliveryLoading(false);
    }
  }

  const onSelectVariant = (variantId) => {
    // Set the selected variant ID directly
    setSelectedVariant(variantId);
    setSelectedImage(0);
  };

  const currentVariant =
    selectedVariant === 'main-product' || !selectedVariant 
      ? {} // Empty object means use main product data
      : data.variants?.find((variant) => variant._id === selectedVariant) || {};

  // Debug log to see what's happening
  console.log('Selected Variant:', selectedVariant);
  console.log('Current Variant:', currentVariant);
  console.log('Main Product Data:', { price: data.price, salePrice: data.salePrice, stock: data.stock });

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
    <div className="w-full p-4 bg-white">
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
        <div className="space-y-2 py-4">
          {/* Rating & Reviews */}
          <div className="flex flex-row items-center justify-between">

            {/* Brand */}
            <div className="flex flex-row items-center gap-2">
              <button 
                onClick={() => router.push(`/category?brandSlug=${data.brandId?.slug}`)}
                className="font-semibold text-xl text-yellow-500 underline hover:text-yellow-600 transition-colors cursor-pointer"
              >
                {data.brandId?.name}
              </button>
              <ArrowRight className="text-yellow-500 h-5 w-5"/>
            </div>

            <RatingReviews
              averageRating={reviewsData?.firstReview?.rating || "5.0"}
              reviewCount={reviewsData?.totalReviews || "0"}
            />
          </div>

          <h1 className="text-2xl font-bold text-[#181818]">{data.title}</h1>

          <ProductVariants
            variants={[
              // Main product as first option
              {
                _id: 'main-product',
                productId: data._id,
                sku: data.sku,
                price: data.price,
                salePrice: data.salePrice,
                stock: data.stock,
                weight: data.weight,
                images: data.images,
                attributes: {
                  'Size': 'Default'
                },
                isMainProduct: true
              },
              // Then add all variants
              ...(data.variants || [])
            ]}
            maxDisplay={999}
            variantLabel="10KG (2x5KG)"
            showDiscount={true}
            size="large"
            selectedVariant={selectedVariant || 'main-product'}
            onVariantSelect={onSelectVariant}
            isSelectable={true}
          />

          <PriceAndCartDisplay
            key={selectedVariant || 'main-product'} // Force re-render when variant changes
            stock={currentVariant.stock ?? data.stock}
            price={currentVariant.price ?? data.price}
            salePrice={currentVariant.salePrice ?? data.salePrice}
            productId={data._id}
            variantId={selectedVariant}
            quantity={1}
          />

          <PurchaseSection
            pincode={pincode}
            onPincodeChange={setPincode}
            onCheckDelivery={onCheckDelivery}
            expectedDeliveryDate={expectedDeliveryDate}
            onAddToCart={() => { }}
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
            content: additionalInformation,
          },
          // {
          //   title: "Product Details",
          //   content: "Another product details section.",
          // },
        ]}
      />

      <HandPickedProducts />

      {isClient && (
        <div className="px-4 mb-4">
          <CategoryBanner type={type} />
        </div>
      )}

      <HandPickedProducts />

      <ProductReviews productId={id} productName={data.title} reviews={reviewsData} />
    </div>
  );
};

export default ProductPage;
