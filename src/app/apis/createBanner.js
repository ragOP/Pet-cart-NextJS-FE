import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const createBanner = async ({ data }) => {
  const apiResponse = await apiService({
    endpoint: endpoints.banners,
    method: "POST",
    data: data,
  });
  return apiResponse.response;
};
