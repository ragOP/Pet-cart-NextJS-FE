import { useQuery } from "@tanstack/react-query";
import { getBannerBlogs } from "@/app/apis/getBannerBlogs";

export const useBannerBlogs = () => {
  const {
    data: bannerBlogsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bannerBlogs"],
    queryFn: () => getBannerBlogs(),
    select: (response) => {
      if (response?.success && response?.data?.blogs) {
        return response.data.blogs;
      }
      return [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    bannerBlogs: bannerBlogsData || [],
    isLoading,
    isError,
    error,
  };
};
