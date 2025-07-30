# API Functions Documentation

This directory contains all API-related functions for the Pet Caart application.

## Breed-Related Functions

### `getBreeds.js`
- **Purpose**: Fetches a list of all breeds for display in category sections
- **Returns**: Array of breed objects with basic info (id, name, slug, image)
- **Usage**: Used in Category component for breed listing
- **Data**: Dummy data with 6 breeds (German Shepherd, Golden Retriever, etc.)

### `getBreedBySlug.js`
- **Purpose**: Fetches detailed information for a specific breed by slug
- **Returns**: Complete breed object with all details (characteristics, care info, etc.)
- **Usage**: Used in shop-by-breed detail pages
- **Data**: Comprehensive dummy data with full breed profiles
- **Parameters**: `slug` (string) - URL-friendly breed identifier

## File Organization

### Separated Functions
- **`getBreeds.js`**: Lightweight data for lists and navigation
- **`getBreedBySlug.js`**: Detailed data for individual breed pages

### Benefits of Separation
1. **Performance**: List view loads faster with minimal data
2. **Maintainability**: Each function has a single responsibility
3. **Scalability**: Easy to modify individual functions
4. **Clarity**: Clear distinction between list and detail data

## Data Structure

### List View Data (`getBreeds`)
```javascript
{
  _id: "string",
  name: "string", 
  slug: "string",
  image: "string"
}
```

### Detail View Data (`getBreedBySlug`)
```javascript
{
  _id: "string",
  name: "string",
  slug: "string",
  description: "string",
  image: "string",
  backgroundImage: "string",
  colors: ["array"],
  weight: { male: "string", female: "string" },
  height: { male: "string", female: "string" },
  lifeExpectancy: "string",
  size: "string",
  shedding: "string",
  coat: "string",
  hotWeatherTolerance: "string",
  coldWeatherTolerance: "string",
  characteristics: { ... },
  care: { ... }
}
```

## Available Breeds

1. **German Shepherd** - `german-shepherd`
2. **Golden Retriever** - `golden-retriever`
3. **Labrador Retriever** - `labrador-retriever`
4. **Bulldog** - `bulldog`
5. **Beagle** - `beagle`
6. **Poodle** - `poodle`

## Future API Integration

When the backend API is ready, simply replace the dummy data with actual API calls:

```javascript
// Replace dummy data with API call
const apiResponse = await apiService({
  endpoint: endpoints.breed,
});
return apiResponse.response;
```

The function signatures and return structures remain the same, ensuring seamless integration. 