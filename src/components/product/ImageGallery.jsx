import React, { useEffect, useState } from "react";
import CustomImage from "@/components/images/CustomImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Note: Carousel components are still used for mobile view

const ImageGallery = ({ images, selectedImage, selectedVariant, onSelect }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsZoomOpen(true);
  };

  // Early return after all hooks are declared
  if (!images || images.length === 0) return null;

  if (isMobile) {
    const totalSlides = images.length;
    
    const showPrevious = currentSlide > 0;
    const showNext = currentSlide < totalSlides - 1;

    return (
      <div className="relative w-full bg-gray-50/30 rounded-xl p-3">
        <Carousel 
          className="w-full" 
          opts={{
            startIndex: currentSlide,
            dragFree: true,
            containScroll: "trimSnaps",
            onSelect: (api) => {
              if (api) {
                const newIndex = api.selectedScrollSnap();
                setCurrentSlide(newIndex);
              }
            }
          }}
        >
          <CarouselContent className="w-full p-0 m-0">
            {images.map((img, idx) => (
              <CarouselItem key={idx} className="w-full p-0 m-0">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <CustomImage
                    src={img}
                    alt={`Product ${idx + 1}`}
                    className="w-full h-72 object-contain transition-transform duration-300 ease-out"
                    style={{ width: "100%" }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {showPrevious && (
            <CarouselPrevious 
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 hover:bg-white shadow-lg border-0"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(prev => Math.max(0, prev - 1));
              }}
            />
          )}
          {showNext && (
            <CarouselNext 
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 hover:bg-white shadow-lg border-0"
              onClick={() => {
                setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1));
              }}
            />
          )}
        </Carousel>
      </div>
    );
  }

  return (
    <div className="space-y-3 bg-gray-50/30 rounded-xl p-3">
      <div className="flex gap-3 h-[500px]">
        {/* Left Thumbnail Scroll */}
        <div className="w-20 flex-shrink-0 h-full overflow-y-auto hide-scrollbar">
          <div className="flex flex-col gap-1.5">
            {images.map((img, idx) => (
              <button
                key={selectedVariant ? images[idx] : idx}
                onClick={() => onSelect(idx)}
                className={`w-full border-2 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${selectedImage === idx ? "border-[#f19813] shadow-md" : "border-gray-200 hover:border-[#f19813]"}`}
              >
                <CustomImage
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className="w-full h-20 object-contain bg-white rounded-md"
                  width={80}
                  height={80}
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Image */}
        <div className="flex-1 relative border border-gray-200 rounded-2xl p-1.5 shadow-sm h-full bg-white">
          <div
            onClick={handleImageClick}
            className="cursor-pointer border border-[#f19813] rounded-xl p-1.5 relative h-full transition-all duration-300 ease-out hover:shadow-md group"
          >
            <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>
            <div className="h-full flex items-center justify-center rounded-lg overflow-hidden">
              <CustomImage
                key={`main-${selectedImage}-${images[selectedImage]}`}
                src={images[selectedImage]}
                alt="Main Product"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Dialog */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-white">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 z-50 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors shadow-lg"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center justify-center p-8 h-full">
            <img
              key={`zoom-${selectedImage}-${images[selectedImage]}`}
              src={images[selectedImage]}
              alt="Zoomed Product"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
