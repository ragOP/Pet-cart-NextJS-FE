import React, { useEffect, useState } from "react";
import CustomImage from "@/components/images/CustomImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactImageMagnify from "react-image-magnify";

const ImageGallery = ({ images, selectedImage, onSelect }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!images || images.length === 0) return null;

  if (isMobile) {
    return (
      <div className="relative w-full overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent className="w-full">
            {images.map((img, idx) => (
              <CarouselItem key={idx} className="w-full">
                <CustomImage
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className="w-full h-60 object-contain bg-white rounded-lg block"
                  style={{ width: "100%" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4">
      <div className="flex flex-col gap-2 w-24">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`border-2 rounded-lg overflow-hidden ${
              selectedImage === idx ? "border-orange-400" : "border-gray-200"
            }`}
          >
            <CustomImage
              src={img}
              alt={`Product ${idx + 1}`}
              className="w-full h-28 object-contain bg-white"
              width={110}
              height={110}
            />
          </button>
        ))}
      </div>
      <div className="flex-1 relative">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Main Product",
              isFluidWidth: true,
              src: images[selectedImage],
            },
            largeImage: {
              src: images[selectedImage],
              width: 1000,
              height: 1000,
            },
            enlargedImageContainerDimensions: {
              width: "120%",
              height: "150%",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
