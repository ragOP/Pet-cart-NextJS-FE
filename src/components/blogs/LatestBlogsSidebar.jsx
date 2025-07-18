"use client";

import React from "react";
import PawIcon from "@/icons/PawIcon";
import { Clock, Share2 } from "lucide-react";

// Blog Card Component
const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:ring-2 hover:ring-blue-500 cursor-pointer group">
      <h4 className="text-[1rem] font-[400] text-gray-900 mb-3 line-clamp-4 hover:text-blue-600 cursor-pointer transition-colors leading-tight group-hover:text-blue-600">
        {blog.title}
      </h4>
      
      {/* Date and Read Time in same row with dash */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <span>{blog.date}</span>
        <span>-</span>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{blog.readTime}</span>
        </div>
      </div>
      
      {/* Share count and View Post button in bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Share2 className="w-3 h-3" />
          <span>{blog.shares}</span>
        </div>
        <button className="text-[#004E6A] text-xs font-medium hover:text-[#003D55] transition-colors underline decoration-[#B4700A] decoration-2 underline-offset-2 group-hover:decoration-[#A36609]">
          View Post
        </button>
      </div>
    </div>
  );
};

const LatestBlogsSidebar = () => {
  const latestBlogs = [
    {
      id: 1,
      title: "Signs Your Dog Is Bored at Home—And How You Can Instantly Make Life More Exciting for Them",
      date: "June 21, 2022",
      readTime: "2 minute read",
      shares: "14K",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      title: "Why Your Cat's Strange Behavior Isn't So Strange After All—What It Really Means and How to Respond",
      date: "June 21, 2022",
      readTime: "2 minute read",
      shares: "14K"
    },
    {
      id: 3,
      title: "The Complete Guide to Pet Nutrition Mistakes Every Owner Makes Without Realizing It—And How to Fix Them",
      date: "June 21, 2022",
      readTime: "2 minute read",
      shares: "14K"
    },
    {
      id: 4,
      title: "The Complete Guide to Pet Nutrition Mistakes Every Owner Makes Without Realizing It—And How to Fix Them",
      date: "June 21, 2022",
      readTime: "2 minute read",
      shares: "14K"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex items-center gap-2">
        <PawIcon />
        <h3 className="text-[24px] pt-1 font-bold text-[#004E6A]">The Latest Blogs</h3>
      </div>

      {/* Hero Blog Card with Image */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:ring-2 hover:ring-blue-500 cursor-pointer group">
        <div className="relative h-48">
          <img
            src={latestBlogs[0].image}
            alt={latestBlogs[0].title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h4 className="text-sm font-semibold mb-2 line-clamp-3 leading-tight group-hover:text-blue-200 transition-colors">
              {latestBlogs[0].title}
            </h4>
            <div className="flex items-center justify-between text-xs">
              <span>{latestBlogs[0].date}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{latestBlogs[0].readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Blog Cards */}
      <div className="flex flex-col gap-6 mt-2">
        {latestBlogs.slice(1).map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default LatestBlogsSidebar; 