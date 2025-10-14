import breedData from '@/data/shopByBreed.json';

/**
 * Get all breeds for a specific category (dogs or cats)
 * @param {string} category - 'dogs' or 'cats'
 * @returns {Array} Array of breed objects
 */
export const getBreedsByCategory = (category) => {
  if (!category || !breedData[category]) {
    return [];
  }
  return breedData[category];
};

/**
 * Get all breeds (both dogs and cats)
 * @returns {Array} Array of all breed objects
 */
export const getAllBreeds = () => {
  return [...breedData.dogs, ...breedData.cats];
};

/**
 * Get a specific breed by slug
 * @param {string} slug - The breed slug
 * @returns {Object|null} Breed object or null if not found
 */
export const getBreedBySlug = (slug) => {
  if (!slug) return null;
  
  const allBreeds = getAllBreeds();
  return allBreeds.find(breed => breed.slug === slug) || null;
};

/**
 * Get breeds by search query
 * @param {string} query - Search query
 * @returns {Array} Array of matching breed objects
 */
export const searchBreeds = (query) => {
  if (!query) return getAllBreeds();
  
  const lowercaseQuery = query.toLowerCase();
  const allBreeds = getAllBreeds();
  
  return allBreeds.filter(breed => 
    breed.name.toLowerCase().includes(lowercaseQuery) ||
    breed.description.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Get random breeds for featured/recommended sections
 * @param {number} count - Number of breeds to return
 * @param {string} category - Optional category filter ('dogs' or 'cats')
 * @returns {Array} Array of random breed objects
 */
export const getRandomBreeds = (count = 4, category = null) => {
  const breeds = category ? getBreedsByCategory(category) : getAllBreeds();
  const shuffled = [...breeds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

