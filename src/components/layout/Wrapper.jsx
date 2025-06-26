"use client";

import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

const Wrapper = ({ children, headerFooterData }) => {
  return (
    <>
      <Header logo={headerFooterData?.logo} />
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
