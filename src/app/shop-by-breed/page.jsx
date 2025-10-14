'use client';

import React, { useState } from 'react';
import { getAllBreeds, getBreedsByCategory, searchBreeds } from '@/helpers/shopByBreed';
import Link from 'next/link';
import CustomImage from '@/components/images/CustomImage';
import { Search } from 'lucide-react';

export default function ShopByBreedPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get breeds based on filter
  const getFilteredBreeds = () => {
    let breeds = [];
    
    if (searchQuery) {
      breeds = searchBreeds(searchQuery);
    } else if (selectedCategory === 'all') {
      breeds = getAllBreeds();
    } else {
      breeds = getBreedsByCategory(selectedCategory);
    }
    
    return breeds;
  };

  const filteredBreeds = getFilteredBreeds();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0888B1] to-[#06A0CE] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Shop by Breed</h1>
          <p className="text-lg opacity-90">
            Find the perfect products for your pet's breed
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search breeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0888B1] focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#0888B1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('dogs')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === 'dogs'
                  ? 'bg-[#0888B1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dogs 🐕
            </button>
            <button
              onClick={() => setSelectedCategory('cats')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === 'cats'
                  ? 'bg-[#0888B1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cats 🐈
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredBreeds.length} breed{filteredBreeds.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Breed Grid */}
        {filteredBreeds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBreeds.map((breed) => (
              <Link
                key={breed.id}
                href={`/shop-by-breed/${breed.slug}`}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <CustomImage
                      src={breed.image}
                      alt={breed.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      width={400}
                      height={300}
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
                      {breed.category === 'dogs' ? '🐕 Dog' : '🐈 Cat'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0888B1] transition-colors">
                      {breed.name}
                    </h3>
                    <p 
                      className="text-sm text-gray-600 mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: breed.description }}
                    />

                    {/* Characteristics */}
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium mr-2">Size:</span>
                        <span>{breed.characteristics.size}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium mr-2">Lifespan:</span>
                        <span>{breed.characteristics.lifespan}</span>
                      </div>
                    </div>

                    {/* View Details */}
                    <div className="mt-4 text-[#0888B1] text-sm font-medium flex items-center">
                      View Details
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No breeds found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

