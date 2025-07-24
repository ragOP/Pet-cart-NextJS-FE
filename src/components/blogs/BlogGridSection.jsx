"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getBlogs } from "@/app/apis/getBlogs";
import BlogCard from "./BlogCard";
import NewsletterSignup from "./NewsletterSignup";
import LatestBlogsSidebar from "./LatestBlogsSidebar";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import { formatCount } from "@/utils/formatCount";
import { formatDate } from "@/utils/formatDate";

const BlogGridSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const {
    data: blogsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs", { page: 1, limit: 3 }],
    queryFn: () => getBlogs({ page: 1, limit: 3 }),
    select: (response) => {
      if (response?.success && response?.data?.blogs) {
        return response.data.blogs;
      }
      return [];
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const formatBlogData = (blog) => {
    return {
      id: blog._id || blog.id,
      image: blog.image,
      tags: blog.tags || [],
      title: blog.title,
      author: "Parth Panjwani", 
      date: formatDate(blog.createdAt),
      shares: formatCount(blog.totalViews),
      description: blog.description,
    };
  };

  if (isLoading) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 bg-white">
        <div className="flex items-center justify-center min-h-[300px]">
          <PrimaryLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 bg-white">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
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
          <div className="w-full lg:w-1/4">
            <LatestBlogsSidebar />
          </div>
        </div>
      </div>
    );
  }

  if (!blogsData || blogsData.length === 0) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 bg-white">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
              <p className="text-gray-500">No blog posts are available at the moment.</p>
            </div>
          </div>
          <div className="w-full lg:w-1/4">
            <LatestBlogsSidebar />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogsData.map((blog, index) => {
              const formattedBlog = formatBlogData(blog);
              return (
                <div
                  key={formattedBlog.id}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <BlogCard
                    id={formattedBlog.id}
                    image={formattedBlog.image}
                    tags={formattedBlog.tags}
                    title={formattedBlog.title}
                    author={formattedBlog.author}
                    date={formattedBlog.date}
                    shares={formattedBlog.shares}
                    description={formattedBlog.description}
                    isHovered={hoveredCard === index}
                    onClick={() => router.push(`/blogs/${formattedBlog.id}`)}
                  />
                </div>
              );
            })}
          </div>

          <div>
            <NewsletterSignup />
          </div>
        </div>

        <div className="w-full lg:w-1/4">
          <LatestBlogsSidebar />
        </div>
      </div>
    </div>
  );
};

export default BlogGridSection; 