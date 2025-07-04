import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getOrders = async ({ params }) => {
  const apiResponse = await apiService({
    endpoint: `${endpoints.orders}/get-all-orders`,
    method: "GET",
    params,
  });
  return apiResponse.response;
};