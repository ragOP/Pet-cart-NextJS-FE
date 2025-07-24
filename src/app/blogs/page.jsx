"use client";

import React from "react";
import BlogHero from "@/components/blogs/BlogHero";
import BlogSearchFilter from "@/components/blogs/BlogSearchFilter";
import BlogProductImageSection from "@/components/blogs/BlogProductImageSection";
import BlogGrid from "@/components/blogs/BlogGrid";
import BlogRecommendations from "@/components/blogs/BlogRecommendations";
import PickYourPet from "@/components/blogs/PickYourPet";
import { useBlogs } from "@/hooks/useBlogs";

export default function BlogsPage() {
  const {
    blogs,
    searchQuery,
    relevanceFilter,
    categoryFilter,
    hoveredCard,
    isLoading,
    isError,
    error,
    total,
    handleSearchChange,
    handleRelevanceChange,
    handleCategoryChange,
    handleCardHover,
    handleCardLeave,
  } = useBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHero />
      <BlogSearchFilter
        searchQuery={searchQuery}
        relevanceFilter={relevanceFilter}
        categoryFilter={categoryFilter}
        onSearchChange={handleSearchChange}
        onRelevanceChange={handleRelevanceChange}
        onCategoryChange={handleCategoryChange}
      />

      {/* Error State */}
      {isError && (
        <div className="py-8 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-red-300">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load blogs</h3>
              <p className="text-gray-500 mb-4">
                {error?.response?.data?.message || "There was an error loading the blogs. Please try again later."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#0888B1] text-white px-6 py-2 rounded-lg hover:bg-[#0777A0] transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid - only show if no error */}
      {!isError && (
        <BlogGrid
          blogs={blogs}
          hoveredCard={hoveredCard}
          onCardHover={handleCardHover}
          onCardLeave={handleCardLeave}
          isLoading={isLoading}
        />
      )}

      <BlogProductImageSection />
      <BlogRecommendations />
      <PickYourPet />
    </div>
  );
}
