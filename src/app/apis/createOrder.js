import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const createOrder = async ({ data }) => {
  const apiResponse = await apiService({
    endpoint: endpoints.orders,
    method: "POST",
    data,
  });
  return apiResponse.response;
};