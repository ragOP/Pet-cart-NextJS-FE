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
import { useQuery } from "@tanstack/react-query";
import { getHeaderFooter } from "./apis/getHeaderFooter";
import Brands from "@/components/home/Brands";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["header_footer"],
    queryFn: () => getHeaderFooter(),
    select: (res) => res?.data?.data || {},
  });


  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FDF4E6 0%, #F7F5FF 100%)",
      }}
    >
      <Header logo={data?.logo} />
      <Category />
      <Applod />
      <Essential />
      <Trending />
      <Brands />
      <NewLaunched />
      <CouponSection />
      <BestSellers />
      <CatsLife />
      <TreatSection />
      <Footer
        logo={data?.logo}
        address={data?.address}
        phone={data?.phone}
        email={data?.email}
        instagram={data?.instagram}
        facebook={data?.facebook}
        twitter={data?.twitter}
        linkedin={data?.linkedin}
        youtube={data?.youtube}
      />
    </div>
  );
};

export default Home;
