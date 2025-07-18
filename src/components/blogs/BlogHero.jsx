"use client";

import React from "react";
import CustomImage from "../images/CustomImage";

const BlogHero = () => {
  return (
    <div className="w-full h-auto">
      <CustomImage 
        src="/blog-banner.png" 
        alt="Blog Banner" 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default BlogHero; 