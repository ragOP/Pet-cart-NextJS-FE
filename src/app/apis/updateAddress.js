import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const updateAddress = async ({ id, data }) => {
  const apiResponse = await apiService({
    endpoint: `${endpoints.address}/${id}`,
    method: "PUT",
    data: data,
  });
  return apiResponse.response;
};
