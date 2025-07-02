"use client";

import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Category from "../home/Category";
import { useQuery } from "@tanstack/react-query";
import { getHeaderFooter } from "@/app/apis/getHeaderFooter";
import { Skeleton } from "@/components/ui/skeleton";

const Wrapper = ({ children }) => {
  const { data: headerFooterData, isLoading } = useQuery({
    queryKey: ["headerFooter"],
    queryFn: async () => {
      const response = await getHeaderFooter();
      return response?.data?.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <div className="h-16 w-full bg-gray-100 animate-pulse" />
        {children}
        <div className="h-64 w-full bg-gray-100 animate-pulse mt-8" />
      </>
    );
  }

  return (
    <>
      <Header logo={headerFooterData?.logo} />
      <Category />
      {children}
      <Footer
        logo={headerFooterData?.logo}
        address={headerFooterData?.address}
        phone={headerFooterData?.phone}
        email={headerFooterData?.email}
        instagram={headerFooterData?.instagram}
        facebook={headerFooterData?.facebook}
        twitter={headerFooterData?.twitter}
        linkedin={headerFooterData?.linkedin}
        youtube={headerFooterData?.youtube}
      />
    </>
  );
};

export default Wrapper;
