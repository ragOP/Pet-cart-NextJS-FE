"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLatestBlogs } from "@/app/apis/getLatestBlogs";
import PawIcon from "@/icons/PawIcon";
import { Clock, Share2 } from "lucide-react";
import { timeToRead } from "@/utils/timeToRead";
import { formatCount } from "@/utils/formatCount";

// Blog Card Component
const BlogCard = ({ blog, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:ring-2 hover:ring-blue-500 cursor-pointer group"
      onClick={onClick}
    >
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
        <button 
          className="text-[#004E6A] text-xs font-medium hover:text-[#003D55] transition-colors underline decoration-[#B4700A] decoration-2 underline-offset-2 group-hover:decoration-[#A36609]"
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick();
          }}
        >
          View Post
        </button>
      </div>
    </div>
  );
};

const LatestBlogsSidebar = () => {
  const router = useRouter();

  // Navigation handler
  const handleBlogClick = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };

  // Fetch latest blogs from API
  const { data: latestBlogsData, isLoading, isError } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: () => getLatestBlogs({ limit: 4 }),
    select: (response) => {
      if (response?.success && response?.data) {
        return response.data;
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Helper function to format blog data
  const formatBlogForSidebar = (blog) => {
    const date = blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : "Unknown Date";

    return {
      id: blog._id || blog.id,
      title: blog.title,
      date: date,
      readTime: timeToRead(blog.content),
      shares: formatCount(blog.totalViews),
      image: blog.image
    };
  };

  // Use API data
  const blogsToDisplay = (!isLoading && !isError && latestBlogsData?.length > 0)
    ? latestBlogsData.map(formatBlogForSidebar)
    : [];

  const heroBlog = blogsToDisplay[0];
  const otherBlogs = blogsToDisplay.slice(1);

  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex items-center gap-2">
        <PawIcon />
        <h3 className="text-[24px] pt-1 font-bold text-[#004E6A]">The Latest Blogs</h3>
      </div>

      {/* Hero Blog Card with Image */}
      {heroBlog && (
        <div 
          className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:ring-2 hover:ring-blue-500 cursor-pointer group"
          onClick={() => handleBlogClick(heroBlog.id)}
        >
          <div className="relative h-48">
            <img
              src={heroBlog.image || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
              alt={heroBlog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="text-sm font-semibold mb-2 line-clamp-3 leading-tight group-hover:text-blue-200 transition-colors">
                {heroBlog.title}
              </h4>
              <div className="flex items-center justify-between text-xs">
                <span>{heroBlog.date}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{heroBlog.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Blog Cards */}
      <div className="flex flex-col gap-6 mt-2">
        {otherBlogs.map((blog, index) => (
          <BlogCard 
            key={blog.id} 
            blog={blog} 
            onClick={() => handleBlogClick(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestBlogsSidebar;
