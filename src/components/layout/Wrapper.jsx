"use client";

import React, { useEffect } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Category from "../home/Category";
import { useQuery } from "@tanstack/react-query";
import { getHeaderFooter } from "@/app/apis/getHeaderFooter";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openLoginPopup } from "@/store/uiSlice";
import { selectToken } from "@/store/authSlice";

const Wrapper = ({ children }) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;

  const { data: headerFooterData, isLoading } = useQuery({
    queryKey: ["headerFooter"],
    queryFn: async () => {
      const response = await getHeaderFooter();
      return response?.data?.data;
    },
  });

  // Check for referral code in URL
  useEffect(() => {
    const refCode = searchParams?.get('ref');
    if (refCode && !isLoggedIn) {
      // Store referral code in sessionStorage for use during registration
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('referralCode', refCode);
      }
      // Open login popup
      dispatch(openLoginPopup({ referralCode: refCode }));
    }
  }, [searchParams, dispatch, isLoggedIn]);

  // if (isLoading) {
  //   return (
  //     <>
  //       <div className="h-16 w-full bg-gray-100 animate-pulse" />
  //       {children}
  //       <div className="h-64 w-full bg-gray-100 animate-pulse mt-8" />
  //     </>
  //   );
  // }

  return (
    <>
      <Header logo={headerFooterData?.logo} isLoading={isLoading} />
      <Category isLoading={isLoading} />
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

