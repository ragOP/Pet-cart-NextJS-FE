import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getYouMayLikeBlogs = async (params = {}) => {
  const apiResponse = await apiService({
    endpoint: endpoints.youMayLikeBlogs,
    params,
  });
  return apiResponse.response;
};
