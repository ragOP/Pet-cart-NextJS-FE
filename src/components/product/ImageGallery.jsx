import React, { useEffect, useState, useRef } from "react";
import CustomImage from "@/components/images/CustomImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactImageMagnify from "react-image-magnify";
import { Check, Truck, Lock, CreditCard, Search } from "lucide-react";

// Note: Carousel components are still used for mobile view

// Service guarantee chips data
const serviceChips = [
  {
    id: 1,
    icon: Check,
    text: "100% Authentic",
    color: "text-green-500"
  },
  {
    id: 2,
    icon: Truck,
    text: "Fast Delivery",
    color: "text-orange-500"
  },
  {
    id: 3,
    icon: Lock,
    text: "Secure Checkout",
    color: "text-blue-500"
  },
  {
    id: 4,
    icon: CreditCard,
    text: "Multiple Payments",
    color: "text-purple-500"
  }
];

const ImageGallery = ({ images, selectedImage, selectedVariant, onSelect }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isMagnifyEnabled, setIsMagnifyEnabled] = useState(false);
  const [showMagnify, setShowMagnify] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const magnifyRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside to disable magnify
  useEffect(() => {
    const handleClickOutside = (event) => {
      const magnifyContainer = document.querySelector('.magnify-container');
      if (magnifyContainer && !magnifyContainer.contains(event.target)) {
        setIsMagnifyEnabled(false);
        setShowMagnify(false);
      }
    };

    if (isMagnifyEnabled) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMagnifyEnabled]);

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isMagnifyEnabled) {
      // First click: enable magnify and show it immediately
      setIsMagnifyEnabled(true);
      setShowMagnify(true);
    } else {
      // Second click: toggle magnify on/off
      setShowMagnify(!showMagnify);
    }
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
                className={`w-full border-2 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${selectedImage === idx ? "border-orange-400 shadow-md" : "border-gray-200 hover:border-orange-400"}`}
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
            className={`cursor-pointer border border-orange-300 rounded-xl p-1.5 magnify-container relative h-full transition-all duration-300 ease-out ${isMagnifyEnabled ? 'ring-2 ring-blue-400 shadow-lg' : 'hover:shadow-md'}`}
          >
            {isMagnifyEnabled && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white p-1.5 rounded-full z-10 shadow-lg animate-pulse">
                <Search className="w-3 h-3" />
              </div>
            )}
            <div onClick={handleImageClick} className="h-full flex items-center justify-center rounded-lg overflow-hidden">
              <ReactImageMagnify
                ref={magnifyRef}
                key={`magnify-${isMagnifyEnabled}-${showMagnify}-${selectedImage}`}
                {...{
                  smallImage: {
                    alt: "Main Product",
                    isFluidWidth: true,
                    src: images[selectedImage],
                  },
                  largeImage: {
                    src: images[selectedImage],
                    width: 2400,
                    height: 2400,
                  },
                  enlargedImageContainerDimensions: {
                    width: "200%",
                    height: "200%",
                  },
                  isHintEnabled: false,
                  shouldHideHintAfterFirstActivation: true,
                  shouldUsePositiveSpaceLens: true,
                  lensStyle: {
                    backgroundColor: 'rgba(0,0,0,.6)',
                  },
                  enlargedImageStyle: {
                    zIndex: 1500,
                  },
                  enlargedImageContainerStyle: {
                    zIndex: 1500,
                  },
                  isActivatedOnHover: showMagnify,
                  isActivatedOnClick: false,
                  isActivatedOnTouch: false,
                  hoverDelayInMs: showMagnify ? 0 : 999999,
                  hoverOffDelayInMs: 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service Guarantee Chips - Show only 3 on desktop */}
      {/* <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {serviceChips.slice(0, 3).map((chip) => {
            const IconComponent = chip.icon;
            return (
              <div key={chip.id} className="bg-white border-1 border-gray-100 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2">
                <IconComponent className={`w-5 h-5 ${chip.color}`} />
                <span className="text-sm font-medium text-gray-800">{chip.text}</span>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default ImageGallery;
