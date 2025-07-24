import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getLatestBlogs = async (params = {}) => {
  const apiResponse = await apiService({
    endpoint: endpoints.latestBlogs,
    params,
  });
  return apiResponse.response;
};
