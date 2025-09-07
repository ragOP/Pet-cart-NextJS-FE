"use client";

import { useQuery } from "@tanstack/react-query";
import Applod from "@/components/home/Applod";
import BestSellers from "@/components/home/BestSellers";
import CatsLife from "@/components/home/CatsLife";
import CouponSection from "@/components/home/CouponSection";
import Essential from "@/components/home/Essential";
import NewLaunched from "@/components/home/NewLaunched";
import Promotions from "@/components/home/Brands";
import Trending from "@/components/home/Trending";
import TreatSection from "@/components/home/TreatSection";
import Brands from "@/components/home/Brands";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import { getHomeGridConfig } from "./apis/getHomeGridConfig";
import CustomGridLayout from "@/components/common/CustomGridLayout";
// import Category from "@/components/home/Category";

const Home = () => {
  const {
    data: gridData,
    isLoading: gridLoading,
    isError: gridError,
  } = useQuery({
    queryKey: ["homeGridConfig"],
    queryFn: getHomeGridConfig,
    select: (response) => {
      if (response?.success && response?.data) {
        return response.data;
      }
      return [];
    },
  });

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FDF4E6 0%, #F7F5FF 100%)",
      }}
    >
      {/* <Category /> */}
      <Applod />
      <Essential />

      {/* Custom Grid Layout - New Dynamic Section */}
      {gridData && gridData.length > 0 && (
        <CustomGridLayout gridData={gridData?.[1]} isLoading={gridLoading} />
      )}

      <Trending />
      <Brands />
      <NewLaunched />
      <CouponSection />
      <BestSellers />
      <CatsLife />
      <TreatSection />
    </div>
  );
};

export default Home;
