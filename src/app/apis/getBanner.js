import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getBanners = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.banners,
    params: { type: "web" },
  });
  return apiResponse.response;
};
