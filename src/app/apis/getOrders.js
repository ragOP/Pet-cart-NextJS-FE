import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getOrders = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.orders,
    method: "GET",
  });
  return apiResponse.response;
}; 
