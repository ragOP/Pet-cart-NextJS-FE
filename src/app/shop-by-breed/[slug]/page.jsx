import React from 'react';
import { getBreedBySlug } from '@/app/apis/getBreedBySlug';
import BreedDetailPage from '@/components/shop-by-breed/BreedDetailPage';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  try {
    const breed = await getBreedBySlug(params.slug);
    if (!breed) {
      return {
        title: 'Breed Not Found | Pet Caart',
        description: 'The requested breed could not be found.',
      };
    }

    return {
      title: `${breed.name} - Shop by Breed | Pet Caart`,
      description: breed.description || `Learn about ${breed.name} and find the best products for your pet.`,
    };
  } catch (error) {
    return {
      title: 'Breed Details | Pet Caart',
      description: 'Learn about different dog breeds and find the best products.',
    };
  }
}

export default async function ShopByBreedPage({ params, searchParams }) {
  try {
    const breed = await getBreedBySlug(params.slug);
    
    if (!breed) {
      notFound();
    }

    return <BreedDetailPage breed={breed} searchParams={searchParams} />;
  } catch (error) {
    console.error('Error loading breed:', error);
    notFound();
  }
} 