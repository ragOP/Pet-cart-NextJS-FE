'use client';

import React from 'react';
import { Percent } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const AvailableCoupons = () => {
  // Mock coupon data
  const coupons = [
    {
      id: 1,
      title: 'COUPON 70% OFF',
      validity: 'VALID UNTIL JULY 12TH',
      brand: 'Pedigree',
      code: 'EXTR150',
      status: 'available' // available, applied
    },
    {
      id: 2,
      title: 'COUPON 70% OFF',
      validity: 'VALID UNTIL JULY 12TH',
      brand: 'Pedigree',
      code: 'EXTR150',
      status: 'applied'
    },
    {
      id: 3,
      title: 'COUPON 70% OFF',
      validity: 'VALID UNTIL JULY 12TH',
      brand: 'Pedigree',
      code: 'EXTR150',
      status: 'available'
    }
  ];

  const handleCouponAction = (coupon, action) => {
    console.log(`${action} coupon:`, coupon);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <Percent className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900">Available Coupons</h3>
      </div>
      
      {/* Coupon Carousel */}
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
        <CarouselContent className="flex gap-4">
          {coupons.map((coupon) => (
            <CarouselItem key={coupon.id} className="basis-1/2 min-w-[280px]">
              <div className="flex gap-3">
                {/* Main Coupon Card */}
                <div className="flex-1 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Scalloped edges effect */}
                  <div className="relative">
                    <div className="absolute -top-2 left-0 right-0 h-4 bg-white rounded-full"></div>
                    <div className="absolute -bottom-2 left-0 right-0 h-4 bg-white rounded-full"></div>
                    
                    <div className="px-4 py-3 relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center bg-white">
                            <span className="text-black font-bold text-sm">%</span>
                          </div>
                          <div>
                            <div className="text-orange-800 text-base font-semibold">
                              {coupon.title}
                            </div>
                            <div className="text-orange-700 text-sm">
                              {coupon.validity}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-orange-600 font-bold text-sm">
                            {coupon.brand}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Card */}
                <div className="w-32 bg-orange-200 rounded-lg p-3 flex flex-col justify-center items-center">
                  <div className="text-orange-800 font-bold text-sm mb-2">
                    USE CODE {coupon.code}
                  </div>
                  <button
                    onClick={() => handleCouponAction(coupon, coupon.status === 'applied' ? 'remove' : 'apply')}
                    className={`w-full py-1 px-2 rounded text-xs font-medium transition-colors ${
                      coupon.status === 'applied'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {coupon.status === 'applied' ? 'REMOVE' : 'APPLY'}
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default AvailableCoupons;
