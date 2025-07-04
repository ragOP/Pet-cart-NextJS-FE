import React from 'react'
import { getProductBanner } from '@/app/apis/getProductBanner'
import { useQuery } from "@tanstack/react-query";
import PrimaryLoader from '../loaders/PrimaryLoader';
import PrimaryEmptyState from '../empty-states/PrimaryEmptyState';
import { useRouter } from "next/navigation";

export default function CategoryBanner() {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productBanner"],
    queryFn: getProductBanner,
    select: (res) => res?.data?.data
  });

  // console.log(data?.productId?._id);
  const onNavigateToProduct = () => {
    router.push(`/product/${data?.productId?._id}`);
  };

  return (
      <div className="w-full h-full hidden lg:block p-1 bg-[#FFFBF6]">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <PrimaryLoader />
        </div>
      ) : isError || !data?.image ? (
        <div className="w-full h-full flex items-center justify-center">
          <PrimaryEmptyState title="No banner found!" />
        </div>
      ) : (
        <div className="transition-transform duration-300 ease-in-out transform hover:-translate-y-2 mt-3 cursor-pointer">
          <img
            src={data?.image}
            alt="Category Banner"
            // Move upward a litle on hover for showing selected product
            className="w-full object-cover rounded-md"
            onClick={onNavigateToProduct}
        />
        </div>
      )}
    </div>
  )
}
