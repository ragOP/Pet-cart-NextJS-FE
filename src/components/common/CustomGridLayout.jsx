"use client";

import { useRouter } from "next/navigation";
import CustomImage from "../images/CustomImage";
import GridSkeleton from "./GridSkeleton";
import pawLogo from "../../assets/essential/paws-logo.png";

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
    } else if (item.itemId && item.itemId.slug) {
      // If it's a product/category with itemId, navigate to product page
      router.push(`/product/${item.itemId.slug}`);
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
  const { grid, title, contentItems, backgroundImage, bannerImage, isTitleShow } = gridData;
  const { columns, rows, mobileColumns, mobileRows } = grid;

  // Prepare split title parts based on the first space
  const trimmedTitle = typeof title === "string" ? title.trim() : "";
  const hasSpaceInTitle = trimmedTitle.includes(" ");
  const [firstWord, ...remainingWords] = trimmedTitle
    ? trimmedTitle.split(/\s+/)
    : [];
  const remainingTitle = remainingWords.join(" ");

  // Check if we're on mobile (you can adjust this breakpoint)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="w-full mb-4">
      <div className="mb-8">
        {bannerImage && (
          <CustomImage
            src={bannerImage}
            alt={"grid-banner"}
            className="w-full h-full object-cover"
          />
        )}

        {/* Section Title */}
        {trimmedTitle && isTitleShow && (
          <div className="mt-4 flex gap-2 items-center px-[4%]">
            <CustomImage
              src={pawLogo}
              alt="Paw Logo"
              className="inline-block mr-0 lg:h-7 w-auto h-4 lg:mb-2 mb-0"
            />
            {!hasSpaceInTitle ? (
              <h2 className="text-xl md:text-3xl font-bold text-[#F59A11]">
                {trimmedTitle}
              </h2>
            ) : (
              <>
                <h2 className="text-xl md:text-3xl font-bold text-[#F59A11]">
                  {firstWord}
                </h2>
                <h2 className="text-xl md:text-3xl font-bold text-[#0888B1]">
                  {remainingTitle}
                </h2>
              </>
            )}
          </div>
        )}

        {/* Grid Container */}
        {contentItems?.length > 0 && <div
          className="grid gap-4 lg:py-3 py-2 px-[4%] "
          style={{
            gridTemplateColumns: `repeat(${
              isMobile ? mobileColumns || columns : columns
            }, 1fr)`,
            gridTemplateRows: `repeat(${
              isMobile ? mobileRows || rows : rows
            }, 1fr)`,
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {contentItems?.map((item, itemIndex) => (
            <div
              key={item._id || itemIndex}
              className="relative group cursor-pointer overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform"
              onClick={() => handleItemClick(item)}
            >
              <CustomImage
                src={item.imageUrl}
                alt={`grid-img-${itemIndex}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default CustomGridLayout;
