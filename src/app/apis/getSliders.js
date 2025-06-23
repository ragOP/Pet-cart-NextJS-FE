import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getSliders = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.sliders,
    params: { type: "web" },
  });
  return apiResponse.response;
};
