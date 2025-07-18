# Blog Components

This directory contains all the components for the blog page functionality.

## Components Structure

### 1. BlogHero (`BlogHero.jsx`)
- **Purpose**: Displays the hero section with background image, title, subtitle, and author information
- **Features**:
  - Responsive background image with overlay
  - Large title and subtitle text
  - Author information with view and share counts
  - Fully responsive design

### 2. BlogSearchFilter (`BlogSearchFilter.jsx`)
- **Purpose**: Provides search and filtering functionality
- **Features**:
  - Search input with magnifying glass icon
  - Relevance filter dropdown (Relevance, Latest, Popular, Trending)
  - Category filter dropdown with cat icon
  - Responsive layout that stacks on mobile

### 3. BlogCard (`BlogCard.jsx`)
- **Purpose**: Individual blog post card component
- **Features**:
  - Image with hover zoom effect
  - Tags with blue dots
  - Title with line clamping
  - Author info with profile picture
  - Date and share count
  - Description with line clamping
  - "View Post" button with underline styling
  - Hover effects and transitions

### 4. BlogGrid (`BlogGrid.jsx`)
- **Purpose**: Grid container for blog cards
- **Features**:
  - Responsive grid layout (1 column on mobile, 2 on tablet, 4 on desktop)
  - Hover state management
  - Renders blog cards from data

## Data Management

### Blog Data (`/src/data/blogData.js`)
- Centralized data file containing blog post information
- Each blog object includes: id, image, tags, title, author, date, shares, description

### Custom Hook (`/src/hooks/useBlogs.js`)
- Manages all blog-related state and functionality
- Handles search, filtering, and sorting
- Provides hover state management
- Returns filtered and sorted blog data

## Usage

```jsx
import { useBlogs } from "@/hooks/useBlogs";
import BlogHero from "@/components/blogs/BlogHero";
import BlogSearchFilter from "@/components/blogs/BlogSearchFilter";
import BlogGrid from "@/components/blogs/BlogGrid";

function BlogsPage() {
  const {
    blogs,
    searchQuery,
    relevanceFilter,
    categoryFilter,
    hoveredCard,
    handleSearchChange,
    handleRelevanceChange,
    handleCategoryChange,
    handleCardHover,
    handleCardLeave,
  } = useBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHero />
      <BlogSearchFilter
        searchQuery={searchQuery}
        relevanceFilter={relevanceFilter}
        categoryFilter={categoryFilter}
        onSearchChange={handleSearchChange}
        onRelevanceChange={handleRelevanceChange}
        onCategoryChange={handleCategoryChange}
      />
      <BlogGrid
        blogs={blogs}
        hoveredCard={hoveredCard}
        onCardHover={handleCardHover}
        onCardLeave={handleCardLeave}
      />
    </div>
  );
}
```

## Styling

- Uses Tailwind CSS for styling
- Custom line-clamp utilities added to `globals.css`
- Responsive design with mobile-first approach
- Hover effects and smooth transitions
- Consistent color scheme and typography

## Features

- **Search**: Real-time search through titles, descriptions, and tags
- **Filtering**: Filter by category (Cats, Dogs, Birds, Fish, All)
- **Sorting**: Sort by relevance, latest, popular, or trending
- **Responsive**: Works on all screen sizes
- **Interactive**: Hover effects and smooth animations
- **Accessible**: Proper semantic HTML and ARIA attributes 