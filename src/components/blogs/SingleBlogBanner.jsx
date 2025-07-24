"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import CustomImage from "../images/CustomImage";

const SingleBlogBanner = ({ blog }) => {
    return (
        <div className="relative bg-white">
            {/* Breadcrumbs */}
            <div className="w-full mx-auto py-4 px-4 md:px-20">
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/" className="flex items-center hover:text-[#004E6A] transition-colors">
                        <Home className="w-4 h-4 mr-1" />
                        Home
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/blogs" className="hover:text-[#004E6A] transition-colors">
                        Blogs
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/blogs?category=dogs" className="hover:text-[#004E6A] transition-colors capitalize">
                        {blog?.category || "Dogs"}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium truncate max-w-xs">
                        {blog?.title || "Blog Post"}
                    </span>
                </nav>
            </div>

            {/* Hero Image */}
            <div className="relative w-full">
                <CustomImage
                    src={blog?.image || "/single-blog-banner.png"}
                    alt={blog?.title || "Blog post hero image"}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default SingleBlogBanner; 