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
import ProductTabs from "@/components/product/ProductTabs";
import HandPickedProducts from "@/components/product/HandpickedProducts";
import CategoryBanner from "@/components/category/CategoryBanner";
import { getReviewsByProductId } from "@/app/apis/getReviewsByProductId";
import { checkDelivery } from "@/app/apis/checkDelivery";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { ArrowRight, ChevronRight, FileIcon, FileTextIcon, InfoIcon, MessageSquare, MessageSquareIcon, Check, Truck, Lock, CreditCard } from "lucide-react";
import CouponsDialog from "@/components/dialog/CouponsDialog";
import { formatWeight } from "@/utils/formatWeight";

const ProductPage = ({ params }) => {
  const { id } = React.use(params);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [isCouponsDialogOpen, setIsCouponsDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const { deviceType, isClient } = useDeviceDetection();
  const type = deviceType === "desktop" ? "web" : (deviceType === "tablet" ? "tablet" : "mobile");

  // Service guarantee chips data
  const serviceChips = [
    { icon: Check, text: "100% Authentic", color: "text-green-600", bgColor: "bg-green-50", iconBg: "bg-green-100" },
    { icon: Truck, text: "Fast Delivery", color: "text-orange-600", bgColor: "bg-orange-50", iconBg: "bg-orange-100" },
    { icon: Lock, text: "Secure Checkout", color: "text-blue-600", bgColor: "bg-blue-50", iconBg: "bg-blue-100" },
    { icon: CreditCard, text: "Multiple Payments", color: "text-purple-600", bgColor: "bg-purple-50", iconBg: "bg-purple-100" }
  ];


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
      netWeight: formatWeight(data?.weight),
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

  const handleTaskSubmit = (taskData) => {
    // Handle Kanban task submission here
    console.log("Task added to Kanban:", taskData);
    // You can add API call to add task to Kanban board here
    // For example: addTaskToKanban(taskData.kanbanColumn, taskData);
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
    <div className="w-full px-4 py-4 bg-white">
      {/* <ProductBreadcrumb
        category={data.categoryId}
        subCategory={data.subCategoryId}
      /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8 md:px-[10%]">
        {/* Left: Images */}
        <div className="min-h-[500px]">
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

          {/* Service chips with Add time button */}
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-2">
              {serviceChips.map((chip, index) => {
                const IconComponent = chip.icon;
                return (
                  <div key={index} className={`${chip.bgColor} border border-gray-200/50 rounded-lg px-2 py-1.5 shadow-sm flex items-center gap-1.5 hover:shadow-md transition-all duration-200`}>
                    <div className={`${chip.iconBg} p-1 rounded-full flex items-center justify-center`}>
                      <IconComponent className={`w-3 h-3 ${chip.color}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{chip.text}</span>
                  </div>
                );
              })}


            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="space-y-2 py-4">
          {/* Rating & Reviews */}
          <div className="flex flex-row items-center justify-between">

            {/* Brand */}
            <div className="flex flex-row items-center gap-2">
              <button
                onClick={() => window.open(`/category?brandSlug=${data.brandId?.slug}`, '_blank')}
                className="font-semibold text-xl text-[#f19813] underline hover:text-[#d9820a] transition-colors cursor-pointer"
              >
                {data.brandId?.name}
              </button>
              <ArrowRight className="text-[#f19813] h-5 w-5" />
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
            quantityVariant="new"
          />

          {/* Bank Offers and Coupons Section */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 mb-2 py-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-xs">%</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Bank Offers and coupons
                </h3>
              </div>
              <button
                onClick={() => setIsCouponsDialogOpen(true)}
                className="flex cursor-pointer items-center gap-1 text-[#f19813] hover:text-[#d9820a] hover:underline font-medium text-sm transition-colors"
              >
                <span>Check offers</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

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

      <ProductTabs
        items={[
          {
            title: "Product Details",
            content: data.description,
            icon: FileTextIcon
          },
          {
            title: "Additional Information",
            content: additionalInformation,
            icon: InfoIcon
          },
          {
            title: "Reviews",
            content: { ...reviewsData, productId: id, productName: data.title },
            icon: MessageSquare,
          },
        ]}
      />

      <HandPickedProducts />

      {isClient && (
        <div className="px-4 mb-4">
          <CategoryBanner type={type} />
        </div>
      )}

      <HandPickedProducts />

      {/* Coupons Dialog */}
      <CouponsDialog
        isOpen={isCouponsDialogOpen}
        onClose={() => setIsCouponsDialogOpen(false)}
      />


    </div>
  );
};

export default ProductPage;
