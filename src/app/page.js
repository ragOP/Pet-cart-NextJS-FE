"use client";

import Applod from "@/components/home/Applod";
import BestSellers from "@/components/home/BestSellers";
import CatsLife from "@/components/home/CatsLife";
import CouponSection from "@/components/home/CouponSection";
import Essential from "@/components/home/Essential";
import NewLaunched from "@/components/home/NewLaunched";
import Promotions from "@/components/home/Promotions";
import Trending from "@/components/home/Trending";
import TreatSection from "@/components/home/TreatSection";

// import { fetchCategories, fetchSubCategories, fetchBrands } from "@/helpers/home"

const Home = () => {
  // const categories = fetchCategories({});
  // const subCategories = fetchSubCategories({});
  // const brands = fetchBrands({});
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FDF4E6 0%, #F7F5FF 100%)",
      }}
    >
      <Header />
      <Category />
      <Applod />
      <Essential />
      <Trending />
      <Promotions />
      <NewLaunched />
      <CouponSection />
      <BestSellers />
      <CatsLife />
      <TreatSection />
    </div>
  );
};

export default Home;
