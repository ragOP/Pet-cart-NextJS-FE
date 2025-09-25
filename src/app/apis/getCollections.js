import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getCollections = async ({ params }) => {
  const apiResponse = await apiService({
    endpoint: endpoints.collection,
    params
  });
  return apiResponse.response;
};
