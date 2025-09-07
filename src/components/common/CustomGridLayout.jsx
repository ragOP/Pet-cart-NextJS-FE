"use client";

import { useRouter } from "next/navigation";
import CustomImage from "../images/CustomImage";
import GridSkeleton from "./GridSkeleton";

const CustomGridLayout = ({ gridData, isLoading }) => {
  const router = useRouter();

  const handleItemClick = (item) => {
    if (item.link) {
      // If there's a custom link, navigate to it
      if (item.link.startsWith("http")) {
        window.open(item.link, "_blank");
      } else {
        router.push(item.link);
      }
    } else if (item.itemId && item.itemId._id) {
      // If it's a product/category with itemId, navigate to product page
      router.push(`/product/${item.itemId._id}`);
    }
  };

  // Show skeleton loading state
  if (isLoading) {
    return <GridSkeleton columns={gridData?.grid?.columns || 2} />;
  }

  if (!gridData) {
    return null;
  }

  // Handle single grid section
  const { grid, title, contentItems, backgroundImage, bannerImage } = gridData;
  const { columns, rows } = grid;

  return (
    <div className="w-full">
      <div className="mb-8">

        {bannerImage && <CustomImage
          src={bannerImage}
          alt={'grid-banner'}
          className="w-full h-full object-cover"
        />}

        {/* Section Title */}
        {title && (
          <div className="mb-4 mt-4 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {title}
            </h2>
          </div>
        )}

        {/* Grid Container */}
        <div
          className="grid gap-4 p-4 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {contentItems?.map((item, itemIndex) => (
            <div
              key={item._id || itemIndex}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => handleItemClick(item)}
            >
              <CustomImage
                src={item.imageUrl}
                alt={`grid-img-${itemIndex}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomGridLayout;