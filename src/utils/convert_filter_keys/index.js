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
          
            case "lifeStage":
              convertedFilters["Life Stage"] = value;
              break;
          
            case "breedSize":
              convertedFilters["Breed Size"] = value;
              break;
          
            case "productType":
              convertedFilters["Product Type"] = value;
              break;
          
            case "isVeg":
              if (value === true || value === "true") {
                convertedFilters["Diet Type"] = "Veg";
              }
              // Don't show badge for false/undefined (default state)
              break;
          
            default:
              convertedFilters[key] = value;
          }
          
    });
    
    // Convert object to array of {key, label} objects
    // Exclude filters that are already visible in the UI (category, collection, veg, sort)
    const excludedKeys = ["Sub Category", "Category", "Collection", "Diet Type", "Sort By"];
    
    return Object.entries(convertedFilters)
        .filter(([displayKey, label]) => !excludedKeys.includes(displayKey))
        .map(([displayKey, label]) => {
            // Find the original filter key that maps to this display key
            const originalKey = Object.keys(filters).find(key => {
                switch (key) {
                    case "brandSlug":
                        return displayKey === "Brand";
                    case "breedSlug":
                        return displayKey === "Breed";
                    case "rating":
                        return displayKey === "Rating";
                    case "min_price_range":
                        return displayKey === "Min Price";
                    case "max_price_range":
                        return displayKey === "Max Price";
                    case "lifeStage":
                        return displayKey === "Life Stage";
                    case "breedSize":
                        return displayKey === "Breed Size";
                    case "productType":
                        return displayKey === "Product Type";
                    default:
                        return displayKey === key;
                }
            });
            
            return {
                key: originalKey || displayKey,
                label: label
            };
        });
}
