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
    handleSearchChange,
    handleRelevanceChange,
    handleCategoryChange,
    handleCardHover,
    handleCardLeave,
  } = useBlogs();

  console.log(blogs); // Debugging line

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
      <BlogGrid
        blogs={blogs}
        hoveredCard={hoveredCard}
        onCardHover={handleCardHover}
        onCardLeave={handleCardLeave}
        isLoading={isLoading}
      />
      <BlogRecommendations />
      <PickYourPet />
    </div>
  );
} 