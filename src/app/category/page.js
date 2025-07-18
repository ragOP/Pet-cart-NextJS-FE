"use client";

import React, { useEffect, useState } from "react";
import CategoryBanner from "@/components/category/CategoryBanner";
import FilterSidebar from "@/components/category/FilterSidebar";
import TopFilterBar from "@/components/category/TopFilterBar";
import BestSellerProduct from "@/components/product/BestSellerProduct";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import { getSubCategories } from "@/app/apis/getSubCategories";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryBreadcrumb from "@/components/category/Breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const width = window.innerWidth;
  const type = width > 1024 ? "web" : (width > 768 ? "tablet" : "mobile");

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
    page,
    per_page: 10,
    ...filters,
    ...(price_range && { price_range }),
  };

  let subCategoryParam = searchParams.get("categorySlug");
  if (subCategoryParam) {
    subCategoryParam = {
      categorySlug: subCategoryParam,
    }
  }

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products", page, params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data || [],
    enabled: Object.keys(params).length > 0,
  });

  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    isError: isSubCategoriesError,
  } = useQuery({
    queryKey: ["subCategories", subCategoryParam],
    queryFn: () => getSubCategories(subCategoryParam),
    select: (res) => res?.data?.data || [],
  });

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();

    searchParams.forEach((value, key) => {
      if (!newFilters.hasOwnProperty(key)) {
        params.set(key, value);
      }
    });

    Object.entries(newFilters).forEach(([key, value]) => {
      if (!value || value === "0") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`/category?${params.toString()}`);
    queryClient.invalidateQueries({ queryKey: ["products", page, { ...params }] });
  };

  const deleteFilter = (key) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`/category?${params.toString()}`);
    queryClient.invalidateQueries({ queryKey: ["products", page, { ...params }] });
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  const isLoading = isProductsLoading || isSubCategoriesLoading;
  const isError = isProductsError || isSubCategoriesError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF6]">
        <PrimaryLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF6]">
        <PrimaryEmptyState title="Something went wrong!" />
      </div>
    );
  }

  // if (!productsData?.total) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-[#FFFBF6]">
  //       <PrimaryEmptyState title="No products found!" />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF6]">
      <CategoryBreadcrumb productsCount={productsData?.total || 0} />

      <div className="w-full hidden lg:block p-1 my-3">
        <CategoryBanner type={type} />
      </div>

      <TopFilterBar
        filters={filters || {}}
        onChangeFilter={updateFilters}
        deleteFilter={deleteFilter}
      />

      <div className="flex-1 flex max-w-[1440px] w-full">
        <FilterSidebar
          subCategories={subCategories || []}
          onChangeFilter={updateFilters}
          deleteFilter={deleteFilter}
        />

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ml-6">
          {productsData?.data?.length < 1 ? (
            <div className="flex-1 flex justify-center items-center col-span-4">
              <PrimaryEmptyState title="No products found!" />
            </div>
          ) : (
            productsData?.data?.map((product, index) => (
              <BestSellerProduct
                className="cursor-pointer"
                key={product._id}
                product={product}
                onClick={() => handleProductClick(product._id)}
              />
            ))
          )}

          <div className="w-full col-span-4 flex justify-end py-5">
            {productsData?.total > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => {
                      setPage((prev) => Math.max(1, prev - 1));
                    }}
                  />
                  {Array.from({ length: Math.ceil(productsData?.total / params.per_page) }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        isActive={i + 1 === page}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationNext
                    onClick={() => {
                      setPage((prev) => Math.min(Math.ceil(productsData?.total / params.per_page), prev + 1));
                    }}
                  />
                </PaginationContent>
              </Pagination>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
