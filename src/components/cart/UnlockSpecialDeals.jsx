'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { formatWeight } from '@/utils/formatWeight';

const UnlockSpecialDeals = () => {
    // Dummy product data using actual product structure
    const deals = [

        {
            _id: "68cea07a98170ceba66bb5cf",
            title: "Whiskas Adult Cat Food",
            images: ["https://res.cloudinary.com/doaggd1wa/image/upload/v1758537510/cjrcwd5u9qeowug5kel8.png"],
            isVeg: true,
            price: 3000,
            salePrice: 2500,
            productType: "Wet Food",
            weight: 5000,
            variants: [
                {
                    _id: "68cea07a98170ceba66bb5d1",
                    attributes: {
                        "Flavour": "Fish",
                        "Type": "Adult"
                    },
                    price: 3000,
                    salePrice: 2500
                }
            ],
            brandId: {
                name: "Whiskas"
            }
        },
        {
            _id: "68cea07a98170ceba66bb5cg",
            title: "Pedigree Puppy Food",
            images: ["/bestseller/applod-jar.png"],
            isVeg: true,
            price: 4000,
            salePrice: 3500,
            productType: "Dry Food",
            weight: 8000,
            variants: [
                {
                    _id: "68cea07a98170ceba66bb5d2",
                    attributes: {
                        "Flavour": "Chicken",
                        "Type": "Puppy"
                    },
                    price: 4000,
                    salePrice: 3500
                }
            ],
            brandId: {
                name: "Pedigree"
            }
        }
    ];

    return (
        <div className='px-4 pt-4 pb-0'>
            {/* Title - matching reference image */}
            <h3 className="text-xl font-bold text-[#0e8bc7] mb-2 pl-4">Unlock Special Deals</h3>

            {/* Product Carousel - matching reference design */}
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                    skipSnaps: false,
                    dragFree: true,
                    containScroll: "trimSnaps",
                    slidesToScroll: 1
                }}
                className="w-full"
            >
                <CarouselContent className="flex">
                    {deals.map((product) => {
                        const discount = product.price > product.salePrice
                            ? Math.round(((product.price - product.salePrice) / product.price) * 100)
                            : 0;

                        return (
                            <CarouselItem key={product._id} className="basis-1/3 min-w-[320px]">
                                 <div className="bg-[#f9f4ed] border border-[#fad499] rounded-xl p-2 hover:shadow-lg transition-shadow h-28">
                                    {/* Layout: Image on left (full height), details on right */}
                                    <div className="flex h-full gap-3">
                                        {/* Product Image - Left side (full height) */}
                                        <div className="relative flex-shrink-0 h-full">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.title}
                                                width={80}
                                                height={80}
                                                className="w-16 h-full object-contain"
                                            />
                                        </div>

                                        {/* Product Details - Right side */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                 {/* Product Name and VEG Icon - Top row */}
                                                 <div className="flex items-center justify-between mb-1">
                                                     <h4 className="text-xs font-medium text-gray-900 leading-tight flex-1 pr-2">
                                                         {product.title}
                                                     </h4>

                                                    {/* VEG Icon positioned at top-right */}
                                                    {product.isVeg ? (
                                                        <svg width="24" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                                            <rect x="2.17597" y="0.532411" width="10.6482" height="10.6482" stroke="#218032" strokeWidth="1.06482" />
                                                            <circle cx="7.50013" cy="5.85657" r="3.19446" fill="#218032" />
                                                            <path d="M4.60711 15.9622L2.82305 20.7129H1.92077L0.129874 15.9622H0.963802L2.37191 19.9131L3.78685 15.9622H4.60711ZM6.35451 16.5911V17.9855H7.99502V18.6212H6.35451V20.0772H8.20009V20.7129H5.57526V15.9554H8.20009V16.5911H6.35451ZM12.9146 17.3293C12.7916 17.0924 12.6207 16.9146 12.402 16.7962C12.1832 16.6731 11.9303 16.6116 11.6432 16.6116C11.3288 16.6116 11.0485 16.6822 10.8025 16.8235C10.5564 16.9648 10.3627 17.1653 10.2214 17.425C10.0847 17.6848 10.0164 17.9855 10.0164 18.3273C10.0164 18.6691 10.0847 18.9721 10.2214 19.2364C10.3627 19.4962 10.5564 19.6967 10.8025 19.8379C11.0485 19.9792 11.3288 20.0498 11.6432 20.0498C12.067 20.0498 12.4111 19.9314 12.6754 19.6944C12.9397 19.4574 13.1015 19.1362 13.1607 18.7306H11.3766V18.1086H13.9946V18.7169C13.9445 19.086 13.8123 19.4255 13.5982 19.7354C13.3885 20.0453 13.1128 20.2936 12.7711 20.4805C12.4339 20.6628 12.0579 20.7539 11.6432 20.7539C11.1966 20.7539 10.7888 20.6514 10.4197 20.4463C10.0506 20.2367 9.75663 19.9473 9.53789 19.5782C9.32371 19.2091 9.21662 18.7921 9.21662 18.3273C9.21662 17.8625 9.32371 17.4455 9.53789 17.0764C9.75663 16.7073 10.0506 16.4202 10.4197 16.2151C10.7933 16.0055 11.2012 15.9007 11.6432 15.9007C12.149 15.9007 12.5979 16.026 12.9898 16.2767C13.3863 16.5227 13.6734 16.8736 13.8511 17.3293H12.9146Z" fill="#218032" />
                                                        </svg>
                                                    ) : (
                                                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <span className="text-white text-xs font-bold">N</span>
                                                        </div>
                                                    )}
                                                </div>

                                                 {/* Weight/Size info - Inside chip */}
                                                 <div className="bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded-full inline-block mb-1">
                                                     {product.weight ? formatWeight(product.weight) : product.productType}
                                                 </div>
                                            </div>

                                            {/* Pricing Section - Bottom */}
                                            <div className="flex items-center justify-between mt-1">
                                                <div className="space-y-0.5">
                                                    <div className="text-green-600 font-semibold text-sm">
                                                        ₹{product.salePrice}
                                                    </div>
                                                    {discount > 0 && (
                                                        <div className="text-xs text-gray-600">
                                                            MRP <span className="line-through">₹{product.price}</span>
                                                            <span className="text-green-600 font-medium ml-1">({discount}% Off)</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* CLAIM Button */}
                                                <button className="bg-[#f19813] text-white text-xs font-medium py-2 px-4 rounded-lg hover:bg-[#d9820a] transition-colors">
                                                    CLAIM
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {/* <CarouselPrevious className="-left-4 " />
                <CarouselNext className="-right-4" /> */}
            </Carousel>
        </div>
    );
};

export default UnlockSpecialDeals;
