export const convertFilterValues = (filters) => {
    const [[key, value]] = Object.entries(filters); 

    switch (value) {
        case "priceLowToHigh":
            console.log("Low to High");
            return "Low to High";
        case "priceHighToLow":
            console.log("High to Low");
            return "High to Low";
        case "relevance":
            console.log("Relevance");
            return "Relevance";
        case "popularity":
            console.log("Popularity");
            return "Popularity";
        default:
            console.log("Default");
            return value;
    }
};
