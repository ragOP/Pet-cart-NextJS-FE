"use client";

import React, { useState } from "react";
import BlogCard from "./BlogCard";
import NewsletterSignup from "./NewsletterSignup";
import LatestBlogsSidebar from "./LatestBlogsSidebar";
import { blogData } from "@/data/blogData";

const BlogGridSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const data = blogData?.slice(0, 3);


  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Blog cards and Newsletter */}
        <div className="w-full lg:w-3/4 space-y-6">
          {/* Blog cards row - responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((blog, index) => (
              <div
                key={blog.id}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
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
    </div>
  );
};

export default BlogGridSection; 