"use client";

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
// import Category from "@/components/home/Category";

const Home = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FDF4E6 0%, #F7F5FF 100%)",
      }}
    >
      {/* <Category /> */}
      <Applod />
      <Essential />
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
