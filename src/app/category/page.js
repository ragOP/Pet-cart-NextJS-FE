"use client";

import React, { useEffect, useState, useMemo } from "react";
import CategoryBanner from "@/components/category/CategoryBanner";
import FilterSidebar from "@/components/category/FilterSidebar";
import TopFilterBar from "@/components/category/TopFilterBar";
import BestSellerProduct from "@/components/product/BestSellerProduct";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/app/apis/getProducts";
import { getSubCategories } from "@/app/apis/getSubCategories";
import { getCollections } from "@/app/apis/getCollections";
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

  // Get page from URL or default to 1
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Sync page state with URL on mount and URL changes
  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page")) || 1;
    setPage(urlPage);
  }, [searchParams]);

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const type = width > 1024 ? "web" : width > 768 ? "tablet" : "mobile";

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filters = useMemo(() => {
    const result = {};
    searchParams.forEach((value, key) => {
      // Handle comma-separated values (arrays) for multi-select filters
      const multiSelectKeys = ['brandSlug', 'lifeStage', 'breedSize', 'productType', 'rating'];
      if (multiSelectKeys.includes(key) && value.includes(',')) {
        result[key] = value.split(',');
      } else {
        result[key] = value;
      }
    });
    return result;
  }, [searchParams]);

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
    ...(selectedSubCategory?._id && { subCategoryId: selectedSubCategory._id }),
  };

  let subCategoryParam = searchParams.get("subCategorySlug");
  if (subCategoryParam) {
    subCategoryParam = {
      subCategorySlug: subCategoryParam,
    };
  }

  // Debug: Log subcategory parameter
  useEffect(() => {
    console.log("filters:", filters);
  }, [filters]);

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

  // Set selected subcategory when subCategories are loaded or URL changes
  useEffect(() => {
    if (subCategories && subCategories.length > 0) {
      const subCategorySlugFromUrl = searchParams.get("subCategorySlug");

      if (subCategorySlugFromUrl) {
        // Find subcategory by slug from URL
        const subCategoryFromUrl = subCategories.find(
          (sub) => sub.slug === subCategorySlugFromUrl
        );
        if (subCategoryFromUrl) {
          setSelectedSubCategory(subCategoryFromUrl);
        } else {
          // If slug not found in fetched subcategories, select first subcategory and update URL
          const firstSubCategory = subCategories[0];
          setSelectedSubCategory(firstSubCategory);
          const params = new URLSearchParams(searchParams);
          params.set("subCategorySlug", firstSubCategory.slug);
          router.replace(`/category?${params.toString()}`);
        }
      } else {
        // No subcategory in URL, select first subcategory and set URL
        const firstSubCategory = subCategories[0];
        setSelectedSubCategory(firstSubCategory);
        const params = new URLSearchParams(searchParams);
        params.set("subCategorySlug", firstSubCategory.slug);
        router.replace(`/category?${params.toString()}`);
      }
    }
  }, [subCategories, searchParams, router]);

  // Fetch collections based on selected subcategory
  const {
    data: collections,
    isLoading: isCollectionsLoading,
    isError: isCollectionsError,
  } = useQuery({
    queryKey: ["collections", selectedSubCategory?._id, selectedSubCategory?.slug],
    queryFn: () =>
      getCollections({
        params: {
          page: 1,
          per_page: 100,
          subCategoryId: selectedSubCategory?._id,
        },
      }),
    select: (res) => res?.data?.data || [],
    enabled: !!selectedSubCategory?._id,
  });

  // Debug: Log selectedSubCategory and collections when they change
  useEffect(() => {
    console.log("Selected SubCategory:", selectedSubCategory);
  }, [selectedSubCategory]);

  useEffect(() => {
    if (collections) {
      console.log("Collections loaded:", collections);
    }
  }, [collections]);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();

    searchParams.forEach((value, key) => {
      if (!newFilters.hasOwnProperty(key)) {
        params.set(key, value);
      }
    });

    Object.entries(newFilters).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "0" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        // Handle arrays by joining with commas
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    params.set("page", "1");

    router.replace(`/category?${params.toString()}`, { scroll: false });
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
  };

  // Helper function to update page in URL
  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.replace(`/category?${params.toString()}`, { scroll: false });
  };

  const deleteFilter = (key) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    // Reset to page 1 when filters change
    params.set("page", "1");
    router.replace(`/category?${params.toString()}`, { scroll: false });
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    // Update URL with subcategory slug
    const params = new URLSearchParams(searchParams);
    params.set("subCategorySlug", subCategory.slug);
    // Reset to page 1 when subcategory changes
    params.set("page", "1");
    router.push(`/category?${params.toString()}`);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  const isInitialLoading = isSubCategoriesLoading || isCollectionsLoading;
  const isError = isProductsError || isSubCategoriesError || isCollectionsError;

  if (isInitialLoading) {
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
    <div className="min-h-screen flex flex-col bg-[#fff] pb-20 lg:pb-0">
      <CategoryBreadcrumb productsCount={productsData?.total || 0} />

      <CategoryBanner type={type} />

      <TopFilterBar
        filters={filters || {}}
        onChangeFilter={updateFilters}
        deleteFilter={deleteFilter}
        selectedSubCategory={selectedSubCategory}
        collections={collections}
        productsData={productsData}
      />

      <div className="flex-1 flex max-w-full w-full px-2 sm:px-4 lg:px-6">
        {/* Desktop Collections Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            collections={collections || []}
            selectedSubCategory={selectedSubCategory}
            onChangeFilter={updateFilters}
            filters={filters}
            showDesktopSidebar={true}
            showMobileButton={false}
            isCollectionsLoading={isCollectionsLoading}
          />
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <FilterSidebar
            collections={collections || []}
            selectedSubCategory={selectedSubCategory}
            onChangeFilter={updateFilters}
            filters={filters}
            showDesktopSidebar={false}
            showMobileButton={true}
            isCollectionsLoading={isCollectionsLoading}
          />
        </div>

        <div className="flex-1 flex flex-col">
          {/* Product Count Display */}
          {/* {productsData && (
            <div className="w-full px-2 sm:px-4 lg:px-6 py-4">
              <p className="text-base font-medium text-gray-700">
                Showing {productsData.data?.length || 0} of {productsData.total || 0} products
              </p>
            </div>
          )} */}

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mt-4 md:mt-0 lg:gap-4 xl:grid-cols-4 lg:p-4">
            {isProductsLoading ? (
              <div className="flex-1 flex justify-center items-center col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-4 py-20">
                <PrimaryLoader />
              </div>
            ) : productsData?.data?.length < 1 ? (
              <div className="flex-1 flex justify-center items-center col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-4">
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

            <div className="w-full col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-4 flex justify-center lg:justify-end py-5 pb-20 lg:pb-5">
              {productsData?.total > 0 && (
                <Pagination>
                  <PaginationContent className="flex-wrap gap-1">
                    <PaginationPrevious
                      onClick={() => {
                        const newPage = Math.max(1, page - 1);
                        updatePage(newPage);
                      }}
                      className="text-xs sm:text-sm"
                    />
                    {Array.from(
                      {
                        length: Math.min(
                          5,
                          Math.ceil(productsData?.total / params.per_page)
                        ),
                      },
                      (_, i) => {
                        const totalPages = Math.ceil(
                          productsData?.total / params.per_page
                        );
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
                              onClick={() => updatePage(pageNumber)}
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
                        const totalPages = Math.ceil(productsData?.total / params.per_page);
                        const newPage = Math.min(totalPages, page + 1);
                        updatePage(newPage);
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
    </div>
  );
}
