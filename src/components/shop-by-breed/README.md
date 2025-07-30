# Shop by Breed Components

This directory contains all the components for the "Shop by Breed" feature.

## Components Structure

### Main Components

1. **BreedDetailPage.jsx** - Main page component that orchestrates all breed sections
2. **BreedNavigation.jsx** - Navigation tabs (About, Diet, Training, Grooming)
3. **BreedHero.jsx** - Hero section with breed image, description, and characteristics
4. **BreedCharacteristics.jsx** - Additional characteristics section (placeholder for future expansion)
5. **BreedAdaptability.jsx** - Weather tolerance and climate adaptation information

### Page Structure

- **Route**: `/shop-by-breed/[slug]`
- **Example**: `/shop-by-breed/german-shepherd?id=1`

## Data Structure

The breed data should follow this structure:

```javascript
{
  _id: "string",
  name: "string",
  slug: "string", // URL-friendly version of name
  description: "string",
  image: "string", // Main breed image URL
  backgroundImage: "string", // Background image for adaptability section
  colors: ["string"], // Available colors
  weight: {
    male: "string",
    female: "string"
  },
  height: {
    male: "string", 
    female: "string"
  },
  lifeExpectancy: "string",
  size: "string",
  shedding: "string",
  coat: "string",
  hotWeatherTolerance: "string",
  coldWeatherTolerance: "string",
  characteristics: {
    temperament: "string",
    energyLevel: "string",
    trainability: "string",
    goodWithChildren: "string",
    goodWithOtherDogs: "string"
  },
  care: {
    exercise: "string",
    grooming: "string", 
    health: "string"
  }
}
```

## Features

### Dynamic Content
- All breed information is dynamically loaded based on the slug
- Images change per breed while maintaining the same background structure
- Color options are dynamic and interactive

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly navigation

### Visual Elements
- Dashed borders and outlines as per design
- Gradient backgrounds for weather tolerance cards
- Decorative elements like paw icons and dashed lines
- Background image with dashed outline overlay

### Navigation
- Tab-based navigation for different sections
- Active state styling
- Smooth transitions

## Usage

1. Navigate to `/shop-by-breed/[breed-slug]`
2. The page will automatically load breed data based on the slug
3. Use the navigation tabs to switch between different information sections
4. Interactive elements like color selection are available in the characteristics section

## Styling

The components use a consistent color palette:
- Primary Blue: `#1E3A8A`
- Secondary Blue: `#4A90E2`
- Background: `#F8F5ED`
- Accent Orange: `#D4A574`
- Light Blue: `#E0F2F7`
- Light Orange: `#FFE4B5`

## Future Enhancements

- Add more interactive elements
- Implement breed comparison feature
- Add product recommendations per breed
- Include breed-specific health information
- Add user reviews and ratings 