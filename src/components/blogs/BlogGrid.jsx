"use client";

import React from "react";
import BlogCard from "./BlogCard";
import LatestBlogsSidebar from "./LatestBlogsSidebar";
import NewsletterSignup from "./NewsletterSignup";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";

const BlogGrid = ({ blogs, hoveredCard, onCardHover, onCardLeave, isLoading = false }) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <PrimaryLoader />
        </div>
      </div>
    );
  }

  // Empty state
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

  // Calculate layout
  const itemsPerRow = 4;
  const fullRows = Math.floor(blogs.length / itemsPerRow);
  const remainingItems = blogs.length % itemsPerRow;
  
  // Get blogs for full rows and remaining items
  const fullRowBlogs = blogs.slice(0, fullRows * itemsPerRow);
  const remainingBlogs = blogs.slice(fullRows * itemsPerRow);

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Full rows with 4 blog cards each */}
        {fullRowBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {fullRowBlogs.map((blog, index) => (
              <div
                key={blog.id}
                onMouseEnter={() => onCardHover(index)}
                onMouseLeave={onCardLeave}
              >
                <BlogCard
                  image={blog.image}
                  tags={blog.tags}
                  title={blog.title}
                  author={blog.author}
                  date={blog.date}
                  shares={blog.shares}
                  description={blog.description}
                  isHovered={hoveredCard === index}
                />
              </div>
            ))}
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
                  {remainingBlogs.map((blog, index) => (
                    <div
                      key={blog.id}
                      onMouseEnter={() => onCardHover(fullRowBlogs.length + index)}
                      onMouseLeave={onCardLeave}
                    >
                      <BlogCard
                        image={blog.image}
                        tags={blog.tags}
                        title={blog.title}
                        author={blog.author}
                        date={blog.date}
                        shares={blog.shares}
                        description={blog.description}
                        isHovered={hoveredCard === fullRowBlogs.length + index}
                      />
                    </div>
                  ))}
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