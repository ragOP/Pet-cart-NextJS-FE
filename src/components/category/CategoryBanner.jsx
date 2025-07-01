import React from 'react'
import { getProductBanner } from '@/app/apis/getProductBanner'
import { useQuery } from "@tanstack/react-query";
import PrimaryLoader from '../loaders/PrimaryLoader';
import PrimaryEmptyState from '../empty-states/PrimaryEmptyState';

export default function CategoryBanner() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productBanner"],
    queryFn: getProductBanner,
    select: (res) => res?.data?.data
  });

  return (
      <div className="w-full hidden lg:block p-1 bg-[#FFFBF6]">
      {isLoading ? (
        <PrimaryLoader />
      ) : isError || !data?.image ? (
        <PrimaryEmptyState title="No banner found!" />
      ) : (
        <img
          src={data?.image}
          alt="Category Banner"
          // className="w-full object-cover rounded-md"
        />
      )}
    </div>
  )
}
