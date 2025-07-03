import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const validateCoupon = async ({ code }) => {
  const apiResponse = await apiService({
    endpoint: `${endpoints.coupons}/${code}/validate`,
    method: "GET",
  });
  return apiResponse.response;
};
