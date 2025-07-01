"use client";

import React from 'react'
import CategoryBanner from '@/components/category/CategoryBanner'
import FilterSidebar from '@/components/category/FilterSidebar'
import TopFilterBar from '@/components/category/TopFilterBar'
import BestSellerProduct from '@/components/product/BestSellerProduct'
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import { getSubCategories } from "@/app/apis/getSubCategories";
import PrimaryLoader from '@/components/loaders/PrimaryLoader';
import PrimaryEmptyState from '@/components/empty-states/PrimaryEmptyState';
import { useRouter, useSearchParams } from "next/navigation";
import CategoryBreadcrumb from "@/components/category/Breadcrumb";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = {};
  searchParams.forEach((value, key) => {
    filters[key] = value;
  });

  const price_range =
    filters.min_price_range || filters.max_price_range
      ? {
        min_price_range: Number(filters.min_price_range || 0),
        max_price_range: Number(filters.max_price_range || 10000),
      }
      : undefined;

  const params = {
    page: 1,
    per_page: 10,
    ...filters,
    ...(price_range && { price_range }),
  };

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data || [],
    enabled: Object.keys(params).length > 0,
  });

  const {
    data: subCategories,
    isLoading: subCategoriesLoading,
    isError: subCategoriesError,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: () => getSubCategories(),
    select: (res) => res?.data?.data || [],
  });

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();

    // Existing filters from URL
    searchParams.forEach((value, key) => {
      if (!newFilters.hasOwnProperty(key)) {
        params.set(key, value);
      }
    });

    // Overwrite or remove with new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`/category?${params.toString()}`);
  };

  const deleteFilter = (key) => {
    const updated = { ...filters };
    updated[key] = null;
    updateFilters(updated);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF6]">
      <CategoryBreadcrumb productsCount={data?.total || 0} />
      <CategoryBanner />
      <TopFilterBar filters={filters} onChangeFilter={updateFilters} deleteFilter={deleteFilter} />
      <div className="flex max-w-[1440px] mx-auto">
        {subCategoriesLoading ? (
          <PrimaryLoader />
        ) : subCategoriesError ? (
          <PrimaryEmptyState title="No subcategories found!" />
        ) : (
          <FilterSidebar subCategories={subCategories} onChangeFilter={updateFilters} deleteFilter={deleteFilter} />
        )}
        <div className="flex-1 ml-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <PrimaryLoader />
            ) : isError || !data?.total ? (
              <PrimaryEmptyState title="No products found!" />
            ) : (
              data?.data?.map((product, index) => (
                <BestSellerProduct
                  className="cursor-pointer"
                  key={index}
                  product={product}
                  onClick={() => handleProductClick(product._id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
