import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const getProductBanner = async ({ params }) => {
  console.log("api called");  
  const apiResponse = await apiService({
    endpoint: `${endpoints.productBanner}/get`,
    params: params,
  });
  return apiResponse.response;
};
