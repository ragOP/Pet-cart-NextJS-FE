import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getBlogs = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.blogs,
  });
  return apiResponse.response;
};
