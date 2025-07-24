"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Share2, Calendar } from "lucide-react";
import QuoteIcon from "@/icons/QuoteIcon";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import BestSellerProduct from "@/components/product/BestSellerProduct";
import { CarouselItem } from "@/components/ui/carousel";
import { formatDate } from "@/utils/formatDate";
import { formatCount } from "@/utils/formatCount";
import offIcon from "@/assets/bestseller/off.png";
import vegIcon from "@/assets/bestseller/veg-icon.png";
import starIcon from "@/assets/bestseller/Vector.png";
import "@/styles/hide-scrollbar.css";

const BlogContent = ({ blog }) => {
  const router = useRouter();

  if (!blog) return null;

  // Navigation function
  const handleProductClick = (productId) => {
    if (productId) {
      router.push(`/product/${productId}`);
    }
  };

  // Format date and views
  const formatViewCount = (views) => {
    if (!views) return "0";
    return formatCount(views);
  };

  const formatBlogDate = (dateString) => {
    if (!dateString) return "";
    return formatDate(dateString);
  };

  const formatProductForBestSeller = (product) => {
    if (!product) return null;

    const formatPrice = (price) => {
      if (!price) return 0;
      return price > 10000 ? Math.round(price / 100) : price;
    };

    const formattedPrice = formatPrice(product.salePrice || product.price);
    const formattedMrp = formatPrice(product.price);

    return {
      _id: product._id,
      title: product.title || product.name,
      images: product.images?.length ? product.images : ["/product-icon.png"],
      brandId: {
        name: product.brandId?.name || product.brand || "Unknown Brand",
      },
      rating: product.ratings?.average || product.rating || 4.5,
      price: formattedMrp,
      salePrice: formattedPrice,
      stock: product.stock || 10,
      isBestSeller: product.isBestSeller || true,
      variants: product.variants || [],
      slug: product.slug,
      starIcon,
      vegIcon,
      offIcon,
    };
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-4 md:py-8">
      <h1 className="text-2xl md:text-3xl lg:text-[48px] xl:text-[42px] font-bold text-gray-900 mb-2 leading-tight">
        {blog.title}
      </h1>
      <p className="text-lg md:text-xl lg:text-[32px] text-gray-600 mb-4 md:mb-6 leading-tight">
        {blog.description}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-xs md:text-sm">
              {formatBlogDate(blog.createdAt)}
            </span>
          </div>
          {blog.category && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
              {blog.category}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Eye className="w-4 h-4" />
            <span className="text-xs md:text-sm">
              {formatViewCount(blog.totalViews)} views
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Share2 className="w-4 h-4" />
            <span className="text-xs md:text-sm">Share</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <div
          className="blog-content text-gray-700 text-base md:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {blog.relatedProducts && blog.relatedProducts.length > 0 && (
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <CustomCarousel
            className="hide-scrollbar min-h-[500px] flex items-center justify-center"
            contentClassName="gap-4 flex items-center justify-center min-h-[480px]"
            itemClassName="min-w-fit-content max-w-fit-content flex flex-col items-center justify-center"
            showArrows={true}
          >
            {blog.relatedProducts.map((product, index) => {
              const formattedProduct = formatProductForBestSeller(product);
              return formattedProduct ? (
                <CarouselItem
                  key={product._id || index}
                  className="flex flex-col items-center justify-center"
                >
                  <BestSellerProduct
                    product={formattedProduct}
                    className="w-70 cursor-pointer"
                    onClick={() => handleProductClick(product._id)}
                  />
                </CarouselItem>
              ) : null;
            })}
          </CustomCarousel>
        </div>
      )}
    </div>
  );
};

export default BlogContent;
