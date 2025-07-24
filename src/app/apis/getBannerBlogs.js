import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getBannerBlogs = async (params = {}) => {
  const apiResponse = await apiService({
    endpoint: endpoints.bannerBlogs,
    params,
  });
  return apiResponse.response;
};
