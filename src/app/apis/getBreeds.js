import { apiService } from "./apiService";
import { endpoints } from "./endpoints";

// Dummy breed data for getBreeds (list view)
const dummyBreeds = [
  {
    _id: "1",
    name: "German Shepherd",
    slug: "german-shepherd",
    image: "https://pngimg.com/uploads/german_shepherd/german_shepherd_PNG51.png"
  },
  {
    _id: "2", 
    name: "Golden Retriever",
    slug: "golden-retriever",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=128&h=128&fit=crop"
  },
  {
    _id: "3",
    name: "Labrador Retriever", 
    slug: "labrador-retriever",
    image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=128&h=128&fit=crop"
  },
  {
    _id: "4",
    name: "Bulldog",
    slug: "bulldog", 
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=128&h=128&fit=crop"
  },
  {
    _id: "5",
    name: "Beagle",
    slug: "beagle",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=128&h=128&fit=crop"
  },
  {
    _id: "6", 
    name: "Poodle",
    slug: "poodle",
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=128&h=128&fit=crop"
  }
];

export const getBreeds = async () => {
  // Return dummy data instead of API call
  return {
    data: dummyBreeds,
    success: true,
    message: "Breeds fetched successfully"
  };
};