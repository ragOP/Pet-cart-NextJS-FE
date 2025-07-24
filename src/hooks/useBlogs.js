import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/app/apis/getBlogs";

export const useBlogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [relevanceFilter, setRelevanceFilter] = useState("Relevance");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Build API parameters based on filters
  const apiParams = useMemo(() => {
    const params = {
      page,
      limit,
    };

    // Add search parameter if there's a search query
    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    // Add category parameter if not "All"
    if (categoryFilter && categoryFilter !== "All") {
      params.category = categoryFilter;
    }

    return params;
  }, [searchQuery, categoryFilter, page, limit]);

  // Fetch blogs using React Query
  const {
    data: blogsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs", apiParams],
    queryFn: () => getBlogs(apiParams),
    select: (response) => {
      if (response?.success && response?.data?.blogs) {
        return {
          blogs: response.data.blogs,
          total: response.data.total || 0,
        };
      }
      return { blogs: [], total: 0 };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Apply client-side sorting based on relevance filter
  const sortedBlogs = useMemo(() => {
    if (!blogsData?.blogs) return [];

    let blogs = [...blogsData.blogs];

    switch (relevanceFilter) {
      case "Latest":
        blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Popular":
        blogs.sort((a, b) => (b.totalViews || 0) - (a.totalViews || 0));
        break;
      case "Trending":
        // Sort by views for trending (could be enhanced with other metrics)
        blogs.sort((a, b) => (b.totalViews || 0) - (a.totalViews || 0));
        break;
      default:
        // Relevance - keep API order
        break;
    }

    return blogs;
  }, [blogsData?.blogs, relevanceFilter]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
  };

  const handleRelevanceChange = (filter) => {
    setRelevanceFilter(filter);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    setPage(1); // Reset to first page when changing category
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return {
    blogs: sortedBlogs,
    searchQuery,
    relevanceFilter,
    categoryFilter,
    hoveredCard,
    isLoading,
    isError,
    error,
    page,
    total: blogsData?.total || 0,
    handleSearchChange,
    handleRelevanceChange,
    handleCategoryChange,
    handleCardHover,
    handleCardLeave,
    handlePageChange,
  };
};
