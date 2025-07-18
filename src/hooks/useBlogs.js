import { useState, useMemo } from "react";
import { blogData } from "@/data/blogData";

export const useBlogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [relevanceFilter, setRelevanceFilter] = useState("Relevance");
  const [categoryFilter, setCategoryFilter] = useState("Cats");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and search blogs
  const filteredBlogs = useMemo(() => {
    let filtered = [...blogData];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

      // Apply category filter
  if (categoryFilter !== "All") {
    filtered = filtered.filter(blog => {
      if (categoryFilter === "Cats") {
        return blog.tags.some(tag => 
          tag.toLowerCase().includes("cat")
        );
      } else if (categoryFilter === "Dogs") {
        return blog.tags.some(tag => 
          tag.toLowerCase().includes("dog")
        );
      } else if (categoryFilter === "Birds") {
        return blog.tags.some(tag => 
          tag.toLowerCase().includes("bird")
        );
      } else if (categoryFilter === "Fish") {
        return blog.tags.some(tag => 
          tag.toLowerCase().includes("fish")
        );
      }
      return true;
    });
  }

    // Apply relevance filter (sorting)
    switch (relevanceFilter) {
      case "Latest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Popular":
        filtered.sort((a, b) => parseInt(b.shares) - parseInt(a.shares));
        break;
      case "Trending":
        // For demo purposes, we'll sort by shares
        filtered.sort((a, b) => parseInt(b.shares) - parseInt(a.shares));
        break;
      default:
        // Relevance - keep original order
        break;
    }

    console.log('Filtered blogs:', filtered.length, 'Category filter:', categoryFilter);
    return filtered;
  }, [searchQuery, categoryFilter, relevanceFilter]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleRelevanceChange = (filter) => {
    setRelevanceFilter(filter);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return {
    blogs: filteredBlogs,
    searchQuery,
    relevanceFilter,
    categoryFilter,
    hoveredCard,
    isLoading,
    handleSearchChange,
    handleRelevanceChange,
    handleCategoryChange,
    handleCardHover,
    handleCardLeave,
  };
}; 