import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F5ED] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#E0F2F7] to-transparent"></div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-xl p-2 shadow-sm">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-24 h-12 mx-2 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="flex items-center mb-8">
          <Skeleton className="w-8 h-8 mr-3 rounded-full" />
          <Skeleton className="w-64 h-12 rounded-lg" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="bg-gray-200 rounded-xl p-6 shadow-sm border-2 border-dashed border-gray-300">
              <Skeleton className="w-full h-64 rounded-lg mb-4" />
              <div className="mt-4 p-4 bg-white rounded-lg">
                <Skeleton className="w-full h-20 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Characteristics */}
            <div className="bg-[#FFE4B5] rounded-xl p-6 shadow-sm">
              <Skeleton className="w-32 h-6 mb-4 rounded-lg" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-16 h-4 rounded-lg" />
                    <Skeleton className="w-32 h-4 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            {/* Life Details */}
            <div className="bg-[#E0F2F7] rounded-xl p-6 shadow-sm border-2 border-dashed border-[#4A90E2]">
              <Skeleton className="w-32 h-6 mb-4 rounded-lg" />
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-24 h-4 rounded-lg" />
                    <Skeleton className="w-20 h-4 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Adaptability Section Skeleton */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <Skeleton className="w-8 h-8 mr-3 rounded-full" />
            <Skeleton className="w-48 h-10 rounded-lg" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Skeleton className="w-full h-16 rounded-lg" />
              </div>
            </div>

            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="w-full h-20 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 