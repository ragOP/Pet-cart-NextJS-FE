"use client";

import React from "react";
import CustomImage from "../images/CustomImage";
import { useBannerBlogs } from "@/hooks/useBannerBlogs";
import { formatCount } from "@/utils/formatCount";

const BlogHero = () => {
  const { bannerBlogs, isLoading, isError } = useBannerBlogs();

  const bannerBlog = bannerBlogs.length > 0 ? bannerBlogs[0] : null;

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading banner...</div>
      </div>
    );
  }

  if (isError || !bannerBlog) {
    return (
      <div className="w-full h-auto">
        <CustomImage
          src="/blog-banner.png"
          alt="Blog Banner"
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  const handleShare = (platform) => {
    const url = `${window.location.origin}/blogs/${bannerBlog.slug}`;
    const title = bannerBlog.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "pinterest":
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}&description=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
    }
  };

  return (
    <div className="relative w-full h-auto">
      <div className="relative w-full h-[600px] overflow-hidden">
        <CustomImage
          src={bannerBlog.image || "/blog-banner.png"}
          alt={bannerBlog.title || "Blog Banner"}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="px-6 md:px-12 lg:px-16 pb-8 md:pb-12 lg:pb-16">
            <div className="max-w-4xl text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 leading-none uppercase tracking-wider">
                {bannerBlog.title}
              </h1>

              {bannerBlog.description && (
                <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 leading-relaxed max-w-3xl">
                  {bannerBlog.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base mb-4 md:mb-6">
                {bannerBlog && (
                  <div className="flex items-center gap-1">
                    <span>By</span>
                    <span className="font-semibold">
                      {bannerBlog.author || "Admin"}
                    </span>
                  </div>
                )}
                {bannerBlog.totalViews && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{formatCount(bannerBlog.totalViews)} views</span>
                  </div>
                )}

                {bannerBlog.totalViews && bannerBlog.shares && (
                  <span className="text-white/60">—</span>
                )}
                {bannerBlog.shares && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    <span>{formatCount(bannerBlog.shares)} shares</span>
                  </div>
                )}
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  aria-label="Share on Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  aria-label="Share on Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>

                <button
                  onClick={() => handleShare("pinterest")}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  aria-label="Share on Pinterest"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
