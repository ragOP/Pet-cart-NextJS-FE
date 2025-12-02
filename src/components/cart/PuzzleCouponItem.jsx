'use client';

import React from 'react';
import CustomImage from '@/components/images/CustomImage';

const PuzzleCouponItem = ({ coupon, isApplied = false, onApply, onRemove }) => {
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    };

    return (
        <button
            type="button"
            aria-label={`Activate coupon`}
            className="relative w-[240px] h-[96px] outline-none focus:outline-none bg-transparent rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden"
            onClick={() => {
                if (isApplied) {
                    onRemove && onRemove(coupon._id);
                } else {
                    onApply && onApply(coupon._id);
                }
            }}
        >
            {/* Background Image */}
            <CustomImage
                src="/coupon-bg.svg"
                alt={`Coupon`}
                className="absolute inset-0 top-1/2 -translate-y-1/2 w-[240px] h-[96px] object-contain rounded-2xl"
                width={240}
                height={96}
            />

            {/* Coupon Content */}
            <div className="py-1 pl-2 pr-3 relative z-10 flex w-full h-full">
                <div className="flex flex-col items-center justify-center space-y-1 w-5/6 px-2">
                    <div className="px-2 pb-1 flex flex-col items-center justify-center text-[#684A00] text-[16px] md:text-[16px] tracking-0 font-holtwood leading-[100%] font-[400]">
                        <span>COUPON</span>
                        <span> {coupon?.discountValue}{coupon?.discountType !== "fixed" ? "%" : "Rs"} OFF</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 font-bold text-[8px] md:text-[10px] text-[#181818] tracking-0 leading-[100%]">
                        <span>VALID TILL {formatDate(coupon?.endDate)}</span>
                    </div>
                </div>

                <div className="ml-4 flex flex-col items-center justify-between py-1  text-[#684A00] font-gotham-rounded font-bold">
                    <span className="text-[8px] md:text-[10px]font-medium text-[#323232]">USE CODE</span>
                    <div className="flex items-center justify-center w-full max-w-[80px] px-2 overflow-hidden">
                        <span
                            className="text-[10px] sm:text-[10px] md:text-[9px] font-holtwood font-[400] tracking-0 leading-tight text-center inline-block"
                            style={{
                                wordBreak: 'break-word',
                                overflowWrap: 'anywhere',
                                maxWidth: '100%',
                                hyphens: 'auto'
                            }}
                        >
                            {coupon?.code}
                        </span>
                    </div>
                    <span className={`text-[8px] mt-2 md:text-[11px] font-bold hover:underline ${isApplied ? 'text-red-600' : 'text-[#004E6A]'
                        }`}>
                        {isApplied ? 'REMOVE' : 'APPLY'}
                    </span>
                </div>
            </div>
        </button>
    );
};

export default PuzzleCouponItem;
