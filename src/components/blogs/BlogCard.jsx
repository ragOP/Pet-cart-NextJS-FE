"use client";

import React from "react";

const BlogCard = ({ 
  id,
  image, 
  tags, 
  title, 
  author, 
  date, 
  shares, 
  description, 
  isHovered = false,
  onClick
}) => {
  return (
    <div 
      className={`group bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${isHovered ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 pt-2 pb-4 md:pb-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700 border border-dashed border-gray-300"
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></div>
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Author and Metadata */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                alt={author}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-gray-700">{author}</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{date}</span>
            <div className="flex items-center gap-1">
              <svg 
                className="w-3 h-3" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
              <span>{shares}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] font-normal text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* View Post Button */}
        <div className="flex justify-end">
          <button 
            className="text-[#004E6A] font-medium text-sm hover:text-[#003D55] transition-colors underline decoration-[#B4700A] decoration-2 underline-offset-4 hover:decoration-[#A36609]"
            onClick={(e) => {
              e.stopPropagation(); // Prevent double click when clicking the button
              onClick && onClick();
            }}
          >
            View Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 