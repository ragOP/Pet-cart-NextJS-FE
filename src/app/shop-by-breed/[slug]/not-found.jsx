import React from 'react';
import Link from 'next/link';
import { PawPrint, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <PawPrint className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">Breed Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn't find the breed you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-[#0888B1] text-white px-6 py-3 rounded-xl hover:bg-[#066d8a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try browsing our available breeds:</p>
            <Link href="/" className="text-[#0888B1] hover:underline">
              View All Breeds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 