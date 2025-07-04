import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getCart = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.cart,
  });
  return apiResponse.response;
};