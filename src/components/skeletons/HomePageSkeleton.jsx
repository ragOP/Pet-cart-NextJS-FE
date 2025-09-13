"use client";

import { Skeleton } from "@/components/ui/skeleton";

const HomePageSkeleton = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FDF4E6 0%, #F7F5FF 100%)",
      }}
    >
    <div className="sm:p-10 p-4">
    <Skeleton className='h-[20vh] w-full border-rounded bg-gray-300/80' />
    </div>

      {/* Essential/Slider Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="group">
              <div className="relative overflow-hidden rounded-xl">
                <Skeleton className="h-64 w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-white/90" />
                  <Skeleton className="h-4 w-1/2 bg-white/90" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-3">
                <Skeleton className="h-40 w-full rounded-lg" />
                <div className="absolute top-2 right-2">
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cats Life Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-72 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative group">
              <Skeleton className="h-64 w-full rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <Skeleton className="h-6 w-3/4 mb-2 bg-white/90" />
                <Skeleton className="h-4 w-1/2 bg-white/90" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Banner Ads Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-44 mx-auto mb-4" />
          <Skeleton className="h-6 w-68 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-48 w-full rounded-lg mb-4" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Coupons Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-32 mx-auto mb-4" />
          <Skeleton className="h-6 w-56 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl">
              <Skeleton className="h-32 w-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Skeleton className="h-8 w-24 mx-auto mb-2 bg-white/90" />
                  <Skeleton className="h-4 w-32 mx-auto bg-white/90" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-24 mx-auto mb-4" />
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-center">
              <Skeleton className="h-16 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Grid Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-36 mx-auto mb-4" />
          <Skeleton className="h-6 w-60 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="group">
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Treats Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-28 mx-auto mb-4" />
          <Skeleton className="h-6 w-52 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
              <Skeleton className="h-40 w-full rounded-lg mb-4" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton; 