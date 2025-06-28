import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getSliders = async ({ params }) => {
  const apiResponse = await apiService({
    endpoint: endpoints.sliders,
    params
  });
  return apiResponse.response;
};
