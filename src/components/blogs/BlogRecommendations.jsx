"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "./BlogCard";
import PawIcon from "@/icons/PawIcon";
import { getYouMayLikeBlogs } from "@/app/apis/getYouMayLikeBlogs";
import { timeToRead } from "@/utils/timeToRead";
import { formatCount } from "@/utils/formatCount";
import { formatDate } from "@/utils/formatDate";

const BlogRecommendations = ({ classname }) => {
  const router = useRouter();
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigation handler
  const handleBlogClick = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };

  useEffect(() => {
    const fetchYouMayLikeBlogs = async () => {
      try {
        setLoading(true);
        const response = await getYouMayLikeBlogs();
        setRecommendedBlogs(response?.data || []);
      } catch (err) {
        console.error("Error fetching you may like blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchYouMayLikeBlogs();
  }, []);

  return (
    <div className={`py-2 px-4 md:px-8 lg:px-16 ${classname}`}>
      <div className="max-w-7xl mx-auto">
        {/* "You May Also Like" Section */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <PawIcon />

            <h2 className="text-[32px] mt-1 text-[#0888B1]  font-bold ">
              You May Also Like
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  </div>
                ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                Error loading blogs: {error}
              </div>
            ) : recommendedBlogs.length > 0 ? (
              recommendedBlogs.map((blog, index) => (
                <div key={blog.id || index}>
                  <BlogCard
                    id={blog._id || blog.id}
                    image={blog.image}
                    tags={blog.tags}
                    title={blog.title}
                    author={blog.author || "Parth Panjwani"}
                    date={formatDate(blog.createdAt)}
                    description={blog.description}
                    isHovered={false}
                    shares={formatCount(blog.totalViews)}
                    readTime={timeToRead(blog.content) || "2 minute read"}
                    onClick={() => handleBlogClick(blog._id || blog.id)}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No recommended blogs available
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogRecommendations;
