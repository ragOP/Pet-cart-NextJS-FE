"use client";

import React from "react";
import SingleBlogBanner from "@/components/blogs/SingleBlogBanner";
import BlogContent from "@/components/blogs/BlogContent";
import BlogGridSection from "@/components/blogs/BlogGridSection";
import BlogRecommendations from "@/components/blogs/BlogRecommendations";
import BlogProductImageSection from "@/components/blogs/BlogProductImageSection";

export default function SingleBlogPage({ params }) {
  // Unwrap params Promise using React.use()
  const unwrappedParams = React.use(params);

  // Get blog data based on the ID parameter
  const blog = {
    id: unwrappedParams.id,
    category: "Dogs", // This could also be dynamic based on the blog content
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Banner Section */}
      <SingleBlogBanner blog={blog} />

      {/* Main Content Section */}
      <div className="w-full">
        <BlogContent blog={blog} />
      </div>

      {/* Blog Grid Section */}
      <BlogGridSection />

      <BlogProductImageSection />

      <BlogRecommendations className="py-0"/>

    </div>
  );
} 