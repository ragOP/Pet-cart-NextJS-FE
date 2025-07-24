"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSingleBlog } from "@/app/apis/getSingleBlog";
import SingleBlogBanner from "@/components/blogs/SingleBlogBanner";
import BlogContent from "@/components/blogs/BlogContent";
import BlogGridSection from "@/components/blogs/BlogGridSection";
import BlogRecommendations from "@/components/blogs/BlogRecommendations";
import BlogProductImageSection from "@/components/blogs/BlogProductImageSection";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";

export default function SingleBlogPage({ params }) {
  const unwrappedParams = React.use(params);
  const blogId = unwrappedParams.id;

  const {
    data: blogData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["singleBlog", blogId],
    queryFn: () => getSingleBlog(blogId),
    select: (res) => res?.data || null,
    enabled: !!blogId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <PrimaryLoader />
      </div>
    );
  }

  if (isError || !blogData) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <PrimaryEmptyState
          title="Blog Not Found"
          description={
            error?.response?.data?.message ||
            "The blog post you're looking for doesn't exist or couldn't be loaded."
          }
          actionLabel="Back to Blogs"
          onAction={() => (window.location.href = "/blogs")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <SingleBlogBanner blog={blogData} />

      <div className="w-full">
        <BlogContent blog={blogData} />
      </div>

      <BlogGridSection />

      <BlogProductImageSection />

      <BlogRecommendations className="py-0" />
    </div>
  );
}
