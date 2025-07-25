"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/category/ProductCard";
import { getFeaturedBlogProducts } from "@/app/apis/getFeaturedBlogProducts";

const BlogProductImageSection = () => {
  const [products, setProducts] = useState([]);
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getFeaturedBlogProducts();
        if (res?.success && res?.data?.productIds) {
          const mappedProducts = res.data.productIds.map((p) => ({
            id: p._id,
            image: p.images?.[0] || "",
            name: p.title,
            brand: p.brandId || "",
            description: p.description || "",
            rating: p.ratings?.average?.toFixed?.(1) || "0.0",
            price: p.salePrice || p.price || 0,
            mrp: p.price || 0,
            discount:
              p.salePrice && p.price
                ? `${Math.round(
                    ((p.price - p.salePrice) / p.price) * 100
                  )}% OFF`
                : "",
            deliveryDate: "FRIDAY, 13 JUNE", // Placeholder, as API does not provide
            isBestseller: p.isBestSeller,
            isVeg: true, // Placeholder, as API does not provide
            variants: [], // Placeholder, as API does not provide
          }));
          setProducts(mappedProducts);
          setBannerImage(res.data.bannerImage || "");
        } else {
          setProducts([]);
          setBannerImage("");
        }
      } catch (err) {
        setError("Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-16 py-12 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <div className="py-12 text-gray-400">
            Loading featured products...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-16 py-12 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <div className="py-12 text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left side - Product cards */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="w-full"
                />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-lg h-full">
              {bannerImage ? (
                <img
                  src={bannerImage}
                  alt="Featured Blog Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  No banner image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogProductImageSection;
