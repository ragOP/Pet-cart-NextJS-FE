'use client';

import React from 'react';
import { Tag } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PuzzleCouponItem from './PuzzleCouponItem';
import CouponSaleIcon from '../icons/CouponSaleIcon';

const AvailableCouponsNew = ({ coupons = [], appliedCoupon, onApply, onRemove }) => {
    // Process real coupon data
    const processedCoupons = coupons.map(coupon => ({
        ...coupon,
        isApplied: appliedCoupon === coupon._id
    }));

    return (
        <div className="bg-white rounded-lg px-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <CouponSaleIcon />
                <h3 className="text-lg font-semibold text-gray-900">Available Coupons</h3>
            </div>

            {/* Coupons Carousel */}
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
                    {processedCoupons.map((coupon) => (
                        <CarouselItem key={coupon._id} className="">
                            <PuzzleCouponItem
                                coupon={coupon}
                                isApplied={coupon.isApplied}
                                onApply={() => onApply && onApply(coupon._id)}
                                onRemove={() => onRemove && onRemove(coupon._id)}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Commented out carousel buttons */}
                {/* <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" /> */}
            </Carousel>
        </div>
    );
};

export default AvailableCouponsNew;
