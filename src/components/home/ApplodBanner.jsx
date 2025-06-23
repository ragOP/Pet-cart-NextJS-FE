'use client';

import CustomImage from "../images/CustomImage";

const ApplodBanner = () => {
  return (
    <div className="w-full h-auto min-h-[150px] max-w-screen rounded-lg overflow-hidden p-2 pr-4">
      <CustomImage
        src="/applod-brand.jpg"
        alt="Applod Logo"
        className="w-full h-[120px] md:h-[250px] rounded-lg"
      />
    </div>
  );
};

export default ApplodBanner;
