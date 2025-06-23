import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const registerUser = async (payload) => {
  const apiResponse = await apiService({
    endpoint: endpoints.register,
    method: "POST",
    data: payload,
  });
  return apiResponse.response;
};
