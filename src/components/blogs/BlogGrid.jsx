"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BlogCard from "./BlogCard";
import LatestBlogsSidebar from "./LatestBlogsSidebar";
import NewsletterSignup from "./NewsletterSignup";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import { formatCount } from "@/utils/formatCount";
import { formatDate } from "@/utils/formatDate";

const BlogGrid = ({ blogs, hoveredCard, onCardHover, onCardLeave, isLoading = false }) => {
  const router = useRouter();

  const formatBlogData = (blog) => {
    return {
      id: blog._id || blog.id,
      image: blog.image,
      tags: blog.tags || [],
      title: blog.title,
      author: "Admin",
      date: formatDate(blog.createdAt),
      shares: formatCount(blog.totalViews),
      description: blog.description,
    };
  };

  const handleBlogClick = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };

  if (isLoading) {
    return (
      <div className="py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <PrimaryLoader />
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        </div>
      </div>
    );
  }

  const itemsPerRow = 4;
  const fullRows = Math.floor(blogs.length / itemsPerRow);
  const remainingItems = blogs.length % itemsPerRow;

  const fullRowBlogs = blogs.slice(0, fullRows * itemsPerRow);
  const remainingBlogs = blogs.slice(fullRows * itemsPerRow);

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {fullRowBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {fullRowBlogs.map((blog, index) => {
              const formattedBlog = formatBlogData(blog);
              return (
                <div
                  key={formattedBlog.id}
                  onMouseEnter={() => onCardHover(index)}
                  onMouseLeave={onCardLeave}
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
                    onClick={() => handleBlogClick(formattedBlog.id)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Responsive layout for remaining content */}
        {(remainingBlogs.length > 0 || true) && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Blog cards and Newsletter */}
            <div className="w-full lg:w-3/4 space-y-6">
              {/* Blog cards row - responsive grid */}
              {remainingBlogs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {remainingBlogs.map((blog, index) => {
                    const formattedBlog = formatBlogData(blog);
                    return (
                      <div
                        key={formattedBlog.id}
                        onMouseEnter={() => onCardHover(fullRowBlogs.length + index)}
                        onMouseLeave={onCardLeave}
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
                          isHovered={hoveredCard === fullRowBlogs.length + index}
                          onClick={() => handleBlogClick(formattedBlog.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Newsletter */}
              <div>
                <NewsletterSignup />
              </div>
            </div>

            {/* Right side - Sidebar */}
            <div className="w-full lg:w-1/4">
              <LatestBlogsSidebar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
