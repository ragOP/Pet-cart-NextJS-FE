export default function unslug(str) {
    if(!str) return "";
    if(str === "priceLowToHigh") return "Price Low to High";
    if(str === "priceHighToLow") return "Price High to Low";
    if(str === "relevance") return "Relevance";
    if(str === "popularity") return "Popularity";
    return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
