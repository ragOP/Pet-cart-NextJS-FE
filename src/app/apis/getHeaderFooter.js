import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getHeaderFooter = async () => {
  const apiResponse = await apiService({
    endpoint: endpoints.header_footer,
  });
  return apiResponse.response;
};
