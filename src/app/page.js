"use client";

import { useQuery } from "@tanstack/react-query";
import { getPageConfig } from "./apis/getPageConfig";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import CustomGridLayout from "@/components/common/CustomGridLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Import all static components
import Applod from "@/components/home/Applod";
import BestSellers from "@/components/home/BestSellers";
import CatsLife from "@/components/home/CatsLife";
import CouponSection from "@/components/home/CouponSection";
import Essential from "@/components/home/Essential";
import NewLaunched from "@/components/home/NewLaunched";
import Trending from "@/components/home/Trending";
import TreatSection from "@/components/home/TreatSection";
import Brands from "@/components/home/Brands";
import HomePageSkeleton from "@/components/skeletons/HomePageSkeleton";

const Home = () => {
  // Fetch page configuration
  const {
    data: pageConfig,
    isLoading: pageConfigLoading,
    isError: pageConfigError,
  } = useQuery({
    queryKey: ["pageConfig", "home"],
    queryFn: () => getPageConfig({ pageKey: "home" }),
    select: (response) => {
      if (response?.success && response?.data) {
        return response.data;
      }
      return null;
    },
  });

  // Component mapping for static sections
  const staticComponents = {
    main_banner: Applod,
    slider: Essential,
    brands: Brands,
    coupons: CouponSection,
    best_sellers: BestSellers,
    day_in_cats_life: CatsLife,
    // product_banner_ads: NewLaunched,
    trending: Trending,
    treats: TreatSection,
    product_banner_ads: TreatSection,
  };

  // Render a section based on its type and key
  const renderSection = (section) => {
    const { key, type, id } = section;

    if (type === "static") {
      const Component = staticComponents[key];
      if (Component) {
        return <Component key={`${key}-${section.position}`} />;
      }
      return null;
    }

    if (type === "grid" && id) {
      // The grid data is directly in the id field
      const gridData = {
        grid: id.grid,
        title: id.title,
        contentItems: id.contentItems,
        backgroundImage: id.backgroundImage,
        bannerImage: id.bannerImage,
      };

      return (
        <CustomGridLayout
          key={`grid-${id._id}-${section.position}`}
          gridData={gridData}
          isLoading={false}
        />
      );
    }

    return null;
  };

  // Comprehensive skeleton loading state
  if (pageConfigLoading) {
    return <HomePageSkeleton />;
  }

  if (pageConfigError || !pageConfig) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load page configuration</p>
      </div>
    );
  }

  // Sort sections by position
  const sortedSections =
    pageConfig.sections?.sort((a, b) => a.position - b.position) || [];

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FDF4E6 0%, #F7F5FF 100%)",
      }}
    >
      {sortedSections.map((section) => renderSection(section))}
    </div>
  );
};

export default Home;
