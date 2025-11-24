import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getSpecialOffers = async (params = {}) => {
  const apiResponse = await apiService({
    endpoint: endpoints.specialOffers,
    params,
  });

  return apiResponse.response;
};

