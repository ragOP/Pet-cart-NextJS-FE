import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getBlogs = async (params = {}) => {
  const apiResponse = await apiService({
    endpoint: endpoints.blogs,
    params,
  });
  return apiResponse.response;
};
