import React from 'react'
import { getProductBanner } from '@/app/apis/getProductBanner'
import { useQuery } from "@tanstack/react-query";
import PrimaryLoader from '../loaders/PrimaryLoader';
import PrimaryEmptyState from '../empty-states/PrimaryEmptyState';
import { useRouter } from "next/navigation";

export default function CategoryBanner({ type }) {
  const router = useRouter();
  const params = {
    type,
  };
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productBanner", params],
    queryFn: () => getProductBanner({ params }),
    select: (res) => res?.data?.data
  });

  // console.log(data?.productId?._id);
  const onNavigateToProduct = () => {
    router.push(`/product/${data?.productId?.slug}`);
  };

  return (
    <div className="w-full h-full p-1 sm:p-2 lg:p-1 bg-[#FFFBF6]">
      {isLoading ? (
        <div className="w-full h-24 sm:h-32 lg:h-full flex items-center justify-center">
          <PrimaryLoader />
        </div>
      ) : isError || !data?.image ? (
        <div className="w-full h-24 sm:h-32 lg:h-full flex items-center justify-center">
          <PrimaryEmptyState title="No banner found!" />
        </div>
      ) : (
        <div className="mt-1 sm:mt-2 lg:mt-3 cursor-pointer">
          <img
            src={data?.image}
            alt="Category Banner"
            className="w-full h-24 sm:h-32 md:h-40 lg:h-auto object-cover rounded-md hover:scale-[1.02] transition-transform duration-200"
            onClick={onNavigateToProduct}
          />
        </div>
      )}
    </div>
  )
}
