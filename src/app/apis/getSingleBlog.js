import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getSingleBlog = async (id) => {
  const apiResponse = await apiService({
    endpoint: `${endpoints.singleBlog}/${id}`,
  });
  return apiResponse.response;
}; 