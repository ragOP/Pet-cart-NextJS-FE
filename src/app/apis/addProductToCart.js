
import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

export const addProductToCart = async ({ productId, variantId, quantity = 1 }) => {
  const apiResponse = await apiService({
    endpoint: endpoints.addToCart,
    method: "POST",
    data: {
      product_id: productId || null,
      variant_id: variantId || null,
      quantity: parseInt(quantity, 10)
    },
  });
  return apiResponse.response;
};
