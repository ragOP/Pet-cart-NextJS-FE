import { convertFilterValues } from "../convert_filter_values";

export const convertFilterKeys = (filters) => {
    const convertedFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
        switch (key) {
            case "subCategorySlug":
            case "IsSelectedSubCategory":
              convertedFilters["Sub Category"] = value;
              break;
          
            case "categorySlug":
            case "IsSelectedCategory":
              convertedFilters["Category"] = value;
              break;
          
            case "brandSlug":
              convertedFilters["Brand"] = value;
              break;
          
            case "breedSlug":
              convertedFilters["Breed"] = value;
              break;
          
            case "rating":
              convertedFilters["Rating"] = value;
              break;
          
            case "min_price_range":
              convertedFilters["Min Price"] = value;
              break;
          
            case "max_price_range":
              convertedFilters["Max Price"] = value;
              break;
          
            case "sort_by":
              // const sortValue = convertFilterValues({ sort_by: value });
              convertedFilters["Sort By"] = value;
              break;

            case "collectionSlug":
              convertedFilters["Collection"] = value;
              break;
          
            default:
              convertedFilters[key] = value;
          }
          
    });
    return convertedFilters;
}
