import React, { useEffect } from "react";
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
  useEffect(() => {
    console.log("Selected Image Index:", selectedImage);
    console.log("Selected Image URL:", images[selectedImage]);
  }, [selectedImage, images]);

  if (!images || images.length === 0) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    return (
      <Carousel>
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <CustomImage
                src={img}
                alt={`Product ${idx + 1}`}
                className="w-full object-contain bg-white rounded-lg"
                width={500}
                height={500}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
