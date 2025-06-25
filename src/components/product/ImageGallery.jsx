import React from "react";
import CustomImage from "@/components/images/CustomImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ImageGallery = ({ images, selectedImage, onSelect }) => {
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
                className="w-full h-96 object-contain bg-white rounded-lg"
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
      <div className="flex flex-col gap-2 w-20">
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
              className="w-full h-16 object-contain bg-white"
              width={80}
              height={80}
            />
          </button>
        ))}
      </div>
      <div className="flex-1 relative">
        <CustomImage
          src={images[selectedImage]}
          alt="Main Product"
          className="w-full h-96 object-contain bg-white rounded-lg"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
