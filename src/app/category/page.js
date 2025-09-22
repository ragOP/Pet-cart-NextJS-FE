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
} from "@/components/ui/pagination";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const type = width > 1024 ? "web" : width > 768 ? "tablet" : "mobile";

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    per_page: 12,
    ...filters,
    ...(price_range && { price_range }),
  };

  let subCategoryParam = searchParams.get("categorySlug");
  if (subCategoryParam) {
    subCategoryParam = {
      categorySlug: subCategoryParam,
    };
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
    queryClient.invalidateQueries({
      queryKey: ["products", page, { ...params }],
    });
  };

  const deleteFilter = (key) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`/category?${params.toString()}`);
    queryClient.invalidateQueries({
      queryKey: ["products", page, { ...params }],
    });
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
    <div className="min-h-screen flex flex-col bg-[#FFFBF6] pb-20 lg:pb-0">
      <CategoryBreadcrumb productsCount={productsData?.total || 0} />

      <CategoryBanner type={type} />

      <TopFilterBar
        filters={filters || {}}
        onChangeFilter={updateFilters}
        deleteFilter={deleteFilter}
      />

      <div className="flex-1 flex max-w-full w-full px-2 sm:px-4">
        <FilterSidebar
          subCategories={subCategories || []}
          onChangeFilter={updateFilters}
          deleteFilter={deleteFilter}
        />

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 lg:ml-6">
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

          <div className="w-full col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center lg:justify-end py-5 pb-20 lg:pb-5">
            {productsData?.total > 0 && (
              <Pagination>
                <PaginationContent className="flex-wrap gap-1">
                  <PaginationPrevious
                    onClick={() => {
                      setPage((prev) => Math.max(1, prev - 1));
                    }}
                    className="text-xs sm:text-sm"
                  />
                  {Array.from(
                    {
                      length: Math.min(5, Math.ceil(productsData?.total / params.per_page)),
                    },
                    (_, i) => {
                      const totalPages = Math.ceil(productsData?.total / params.per_page);
                      let pageNumber;

                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else {
                        if (page <= 3) {
                          pageNumber = i + 1;
                        } else if (page >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = page - 2 + i;
                        }
                      }

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={pageNumber === page}
                            onClick={() => setPage(pageNumber)}
                            className="text-xs sm:text-sm w-8 h-8 sm:w-10 sm:h-10"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                  )}
                  <PaginationNext
                    onClick={() => {
                      setPage((prev) =>
                        Math.min(
                          Math.ceil(productsData?.total / params.per_page),
                          prev + 1
                        )
                      );
                    }}
                    className="text-xs sm:text-sm"
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
