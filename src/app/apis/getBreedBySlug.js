// Dummy breed data for getBreedBySlug
const dummyBreeds = [
  {
    _id: "1",
    name: "German Shepherd",
    slug: "german-shepherd",
    description: "The Canine All-Stars - Protecting, Serving, and Winning Hearts",
    image: "https://pngimg.com/uploads/german_shepherd/german_shepherd_PNG51.png",
    backgroundImage: "https://pngimg.com/uploads/german_shepherd/german_shepherd_PNG61.png",
    adaptabilityImage: "https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=300&fit=crop&crop=center",
    colors: ["Black & Tan", "Black", "White"],
    weight: {
      male: "30-40kgs",
      female: "25-35kgs"
    },
    height: {
      male: "61-66cm",
      female: "56-61cm"
    },
    lifeExpectancy: "10-12 years",
    size: "Large",
    shedding: "High",
    coat: "Straight or wavy",
    hotWeatherTolerance: "28°C",
    coldWeatherTolerance: "8°C",
    characteristics: {
      temperament: "Loyal, Intelligent, Courageous",
      energyLevel: "High",
      trainability: "Excellent",
      goodWithChildren: "Yes",
      goodWithOtherDogs: "With proper socialization"
    },
    care: {
      exercise: "High - needs daily vigorous exercise",
      grooming: "Regular brushing required",
      health: "Generally healthy but prone to hip dysplasia"
    }
  },
  {
    _id: "2",
    name: "Golden Retriever",
    slug: "golden-retriever",
    description: "Friendly, Intelligent, and Devoted Family Companions",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=800&fit=crop",
    adaptabilityImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=center",
    colors: ["Golden", "Cream", "Dark Golden"],
    weight: {
      male: "29-34kgs",
      female: "25-29kgs"
    },
    height: {
      male: "56-61cm",
      female: "51-56cm"
    },
    lifeExpectancy: "10-12 years",
    size: "Large",
    shedding: "High",
    coat: "Dense, water-repellent",
    hotWeatherTolerance: "30°C",
    coldWeatherTolerance: "10°C",
    characteristics: {
      temperament: "Friendly, Intelligent, Devoted",
      energyLevel: "High",
      trainability: "Excellent",
      goodWithChildren: "Excellent",
      goodWithOtherDogs: "Excellent"
    },
    care: {
      exercise: "High - loves swimming and retrieving",
      grooming: "Regular brushing and occasional trimming",
      health: "Generally healthy but prone to hip dysplasia and cancer"
    }
  },
  {
    _id: "3",
    name: "Labrador Retriever",
    slug: "labrador-retriever",
    description: "America's Most Popular Dog - Friendly and Outgoing",
    image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=400&h=300&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600&h=800&fit=crop",
    adaptabilityImage: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=400&h=300&fit=crop&crop=center",
    colors: ["Black", "Yellow", "Chocolate"],
    weight: {
      male: "29-36kgs",
      female: "25-32kgs"
    },
    height: {
      male: "57-62cm",
      female: "55-60cm"
    },
    lifeExpectancy: "10-12 years",
    size: "Large",
    shedding: "High",
    coat: "Short, dense, water-resistant",
    hotWeatherTolerance: "32°C",
    coldWeatherTolerance: "12°C",
    characteristics: {
      temperament: "Friendly, Active, Outgoing",
      energyLevel: "High",
      trainability: "Excellent",
      goodWithChildren: "Excellent",
      goodWithOtherDogs: "Excellent"
    },
    care: {
      exercise: "High - loves swimming and retrieving games",
      grooming: "Regular brushing, sheds year-round",
      health: "Generally healthy but prone to obesity and hip dysplasia"
    }
  },
  {
    _id: "4",
    name: "Bulldog",
    slug: "bulldog",
    description: "Calm, Courageous, and Friendly - The Perfect Family Pet",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=800&fit=crop",
    adaptabilityImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop&crop=center",
    colors: ["White", "Fawn", "Brindle", "Piebald"],
    weight: {
      male: "20-28kgs",
      female: "16-23kgs"
    },
    height: {
      male: "31-40cm",
      female: "31-40cm"
    },
    lifeExpectancy: "8-10 years",
    size: "Medium",
    shedding: "Moderate",
    coat: "Short, smooth, fine",
    hotWeatherTolerance: "25°C",
    coldWeatherTolerance: "15°C",
    characteristics: {
      temperament: "Calm, Courageous, Friendly",
      energyLevel: "Low to Moderate",
      trainability: "Moderate",
      goodWithChildren: "Good",
      goodWithOtherDogs: "Good"
    },
    care: {
      exercise: "Low to moderate - short walks and play sessions",
      grooming: "Minimal - occasional brushing and wrinkle cleaning",
      health: "Prone to breathing issues, hip dysplasia, and skin problems"
    }
  },
  {
    _id: "5",
    name: "Beagle",
    slug: "beagle",
    description: "Curious, Friendly, and Merry - The Perfect Family Hound",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&h=800&fit=crop",
    adaptabilityImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop&crop=center",
    colors: ["Tri-color", "Lemon", "Red & White"],
    weight: {
      male: "10-11kgs",
      female: "9-10kgs"
    },
    height: {
      male: "36-41cm",
      female: "33-38cm"
    },
    lifeExpectancy: "12-15 years",
    size: "Small to Medium",
    shedding: "Moderate",
    coat: "Short, dense, weather-resistant",
    hotWeatherTolerance: "30°C",
    coldWeatherTolerance: "10°C",
    characteristics: {
      temperament: "Curious, Friendly, Merry",
      energyLevel: "High",
      trainability: "Moderate",
      goodWithChildren: "Excellent",
      goodWithOtherDogs: "Excellent"
    },
    care: {
      exercise: "High - needs daily walks and mental stimulation",
      grooming: "Minimal - occasional brushing",
      health: "Generally healthy but prone to obesity and ear infections"
    }
  },
  {
    _id: "6",
    name: "Poodle",
    slug: "poodle",
    description: "Intelligent, Active, and Proud - The Elegant Companion",
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&h=300&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&h=800&fit=crop",
    colors: ["Black", "White", "Apricot", "Silver", "Brown"],
    weight: {
      male: "20-32kgs",
      female: "20-27kgs"
    },
    height: {
      male: "45-60cm",
      female: "45-55cm"
    },
    lifeExpectancy: "12-15 years",
    size: "Medium to Large",
    shedding: "Low",
    coat: "Curly, dense, hypoallergenic",
    hotWeatherTolerance: "28°C",
    coldWeatherTolerance: "8°C",
    characteristics: {
      temperament: "Intelligent, Active, Proud",
      energyLevel: "High",
      trainability: "Excellent",
      goodWithChildren: "Good",
      goodWithOtherDogs: "Good"
    },
    care: {
      exercise: "High - needs mental and physical stimulation",
      grooming: "High - requires regular professional grooming",
      health: "Generally healthy but prone to hip dysplasia and eye problems"
    }
  }
];

export const getBreedBySlug = async (slug) => {
  try {
    // Find breed by slug in dummy data
    const breed = dummyBreeds.find(b => b.slug === slug);
    
    if (!breed) {
      return null;
    }

    return {
      ...breed,
      success: true,
      message: "Breed fetched successfully"
    };
  } catch (error) {
    console.error('Error fetching breed by slug:', error);
    return null;
  }
}; 