
import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const deleteProductFromCart = async ({ id }) => {
  const apiResponse = await apiService({
    endpoint: `${endpoints.cart}/${id}`,
    method: "DELETE",
    data: {
      quantity: 0,
    },
  });
  return apiResponse.response;
};
