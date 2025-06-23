import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const loginUser = async (payload) => {
  const apiResponse = await apiService({
    endpoint: endpoints.login,
    method: "POST",
    data: payload,
  });
  return apiResponse.response;
};
