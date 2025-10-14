import React from 'react';
import { getBreedBySlug } from '@/helpers/shopByBreed';
import BreedDetailPage from '@/components/shop-by-breed/BreedDetailPage';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  
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
}

export default async function ShopByBreedPage({ params, searchParams }) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  
  if (!breed) {
    notFound();
  }

  return <BreedDetailPage breed={breed} searchParams={searchParams} />;
} 