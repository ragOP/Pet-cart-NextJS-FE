import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getCoupons = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.coupons,
    method: "GET",
    params: {
      showValid: true,
    },
  });
  return apiResponse.response;
};
