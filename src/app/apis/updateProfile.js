import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const updateProfile = async ({ data }) => {
  const apiResponse = await apiService({
    endpoint: "api/auth/user/update-profile",
    method: "PUT",
    data,
  });
  return apiResponse.response;
};
