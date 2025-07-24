"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import PawIcon from "@/icons/PawIcon";
import { getCategories } from "@/app/apis/getCategories";
import { getBlogs } from "@/app/apis/getBlogs";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import { formatDate } from "@/utils/formatDate";

const PickYourPet = () => {
  const [activeCategory, setActiveCategory] = useState("Dogs");
  const router = useRouter();

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    select: (response) => {
      if (
        response?.data?.data?.categories &&
        Array.isArray(response.data.data.categories)
      ) {
        return response.data.data.categories;
      }

      if (response?.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (response?.data && Array.isArray(response.data)) {
        return response.data;
      }
      if (
        response?.success &&
        response?.data?.data &&
        Array.isArray(response.data.data)
      ) {
        return response.data.data;
      }
      if (response?.success && response?.data && Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response)) {
        return response;
      }

      return [];
    },
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const dogsCategory = data.find((cat) => cat.name === "Dogs");
        if (!dogsCategory && activeCategory === "Dogs") {
          setActiveCategory(data[0].name);
        }
      }
    },
  });

  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ["categoryBlogs", activeCategory],
    queryFn: () => getBlogs({ category: activeCategory }),
    enabled: !!activeCategory,
    select: (response) => {
      if (response?.success && response?.data?.blogs) {
        return response.data.blogs;
      }
      return [];
    },
  });

  React.useEffect(() => {
    if (categories && categories.length > 0) {
      const dogsCategory = categories.find((cat) => cat.name === "Dogs");
      if (!dogsCategory && activeCategory === "Dogs") {
        setActiveCategory(categories[0].name);
      }
    }
  }, [categories, activeCategory]);

  const mainBlog = blogsData && blogsData.length > 0 ? blogsData[0] : null;
  const sidebarBlogs =
    blogsData && blogsData.length > 1 ? blogsData.slice(1, 5) : [];

  const handleBlogClick = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };

  if (categoriesLoading) {
    return (
      <div className="py-6 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <PawIcon />
            <h2 className="text-[32px] mt-1 text-[#0888B1] font-bold">
              Pick Your Pet, Read Your Blog
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-[300px]">
            <PrimaryLoader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <PawIcon />
          <h2 className="text-[32px] mt-1 text-[#0888B1] font-bold">
            Pick Your Pet, Read Your Blog
          </h2>
        </div>

        <div className="flex border-b border-gray-200 mb-4">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-2 text-sm font-medium transition-colors relative ${
                  activeCategory === category.name
                    ? "text-[#004E6A] border-b-2 border-[#B4700A]"
                    : "text-[#121416] hover:text-[#004E6A]"
                }`}
              >
                {category.name}
              </button>
            ))
          ) : (
            <div className="px-6 py-2 text-sm text-gray-500">
              No categories available
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {blogsLoading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <PrimaryLoader />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4">
                {mainBlog ? (
                  <div className="transition-all duration-300 cursor-pointer group">
                    <div
                      className="relative h-64 md:h-80 mb-4 rounded-lg overflow-hidden"
                      onClick={() => handleBlogClick(mainBlog._id)}
                    >
                      <img
                        src={
                          mainBlog.image ||
                          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        }
                        alt={mainBlog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="text-sm text-gray-500">
                        {formatDate(mainBlog.createdAt)}
                      </div>
                      <h3
                        className="text-xl md:text-2xl font-bold text-gray-900 leading-tight cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleBlogClick(mainBlog._id)}
                      >
                        {mainBlog.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {mainBlog.description}
                      </p>
                      <div className="flex">
                        <button
                          onClick={() => handleBlogClick(mainBlog._id)}
                          className="text-[#004E6A] font-medium text-sm hover:text-[#003D55] transition-colors underline decoration-[#B4700A] decoration-2 underline-offset-4 hover:decoration-[#A36609]"
                        >
                          View Post
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No blogs found for this category.
                    </p>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-1/4">
                <div className="space-y-6">
                  {sidebarBlogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="transition-all duration-300 hover:shadow-lg p-1 hover:rounded-sm hover:scale-[1.02] hover:ring-2 hover:ring-blue-500 cursor-pointer group"
                      onClick={() => handleBlogClick(blog._id)}
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={
                              blog.image ||
                              "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                            }
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors leading-tight group-hover:text-blue-600">
                            {blog.title}
                          </h4>
                          <div className="text-sm text-gray-500">
                            {formatDate(blog.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickYourPet;
