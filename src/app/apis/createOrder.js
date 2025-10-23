import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const createOrder = async ({ data, params }) => {
  const apiResponse = await apiService({
    endpoint: endpoints.orders,
    method: "POST",
    data,
    params,
  });
  return apiResponse.response;
};