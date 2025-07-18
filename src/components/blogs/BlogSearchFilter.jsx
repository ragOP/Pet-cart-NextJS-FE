"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown } from "lucide-react";

const BlogSearchFilter = ({ 
  searchQuery, 
  relevanceFilter, 
  categoryFilter, 
  onSearchChange, 
  onRelevanceChange, 
  onCategoryChange 
}) => {
  return (
    <div className="bg-[#0888B1] py-6 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="w-full lg:w-[65%]">
            <div className="relative">
              <Search className="absolute left-4 top-6 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search 'Dog Food Blogs'"
                className="px-12 py-6 text-lg bg-white border-0 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-4 w-full lg:w-[35%] ">
            {/* Relevance Filter */}
            <div className="w-full lg:w-1/2">
              <Select className="w-full" value={relevanceFilter} onValueChange={onRelevanceChange}>
                <SelectTrigger className="py-6 w-full bg-white border-0 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 text-lg">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Relevance">Relevance</SelectItem>
                  <SelectItem value="Latest">Latest</SelectItem>
                  <SelectItem value="Popular">Popular</SelectItem>
                  <SelectItem value="Trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-1/2">
              <Select value={categoryFilter} onValueChange={onCategoryChange}>
                <SelectTrigger className="py-6 w-full bg-white border-0 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 text-lg">
                  <SelectValue placeholder="Cats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cats">Cats</SelectItem>
                  <SelectItem value="Dogs">Dogs</SelectItem>
                  <SelectItem value="Birds">Birds</SelectItem>
                  <SelectItem value="Fish">Fish</SelectItem>
                  <SelectItem value="All">All Pets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSearchFilter; 