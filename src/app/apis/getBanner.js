import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getBanners = async ({ params }) => {
  const apiResponse = await apiService({
    endpoint: endpoints.banners,
    params: params,
  });
  return apiResponse.response;
};
