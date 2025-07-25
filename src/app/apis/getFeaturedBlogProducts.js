import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getFeaturedBlogProducts = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.featuredBlogProducts,
    method: "GET",
  });
  return apiResponse.response;
};
