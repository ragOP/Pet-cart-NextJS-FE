import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getHomeGridConfig = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.gridConfig,
  });
  return apiResponse.response;
};
