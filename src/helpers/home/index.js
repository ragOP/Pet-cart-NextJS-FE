import { apiService } from "@/api/api_services";
import { endpoints } from "@/api/endpoint";

export const fetchCategories = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.category,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoryById = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.category}/${id}`,
      method: "GET",
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data?.category;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

export const fetchSubCategories = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.sub_category,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

export const getSubCategoryById = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.sub_category}/${id}`,
    });

    return apiResponse;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSubCategoriesByCategoryId = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.sub_category,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
}

export const fetchBreeds = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.breed,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

export const getBreedById = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.sub_category}/${id}`,
    });

    return apiResponse;
  } catch (error) {
    console.error(error);
  }
};

export const fetchBrands = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.brand,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

export const getBrandById = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.brand}/${id}`,
    });

    return apiResponse;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCollections = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.collection,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

export const getCollectionById = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.collection}/${id}`,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

export const fetchProducts = async ({ params }) => {
  console.log("params", params);
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.product,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.product}/${id}`,
    });

    return apiResponse;
  } catch (error) {
    console.error(error);
  }
};

