import React from 'react';
import CustomImage from '@/components/images/CustomImage';

const BreedDietTips = ({ breed }) => {
    // Use diet tips from breed data, fallback to empty array
    const dietTips = breed?.diet?.tips || [];

    return (
        <div className="relative mt-8">
            {/* Iterate through all diet tips */}
            {dietTips.map((tip, index) => {
                const isEven = index % 2 === 0; // 0, 2 = left side, 1, 3 = right side
                
                return (
                    <div key={index} className="mb-8">
                        {/* Desktop Layout */}
                        <div className="hidden lg:flex flex-row gap-8 items-center">
                            {/* Left Side - Content Box */}
                            <div className={`w-[35%] ${isEven ? 'order-1' : 'order-2'}`}>
                                <div className="relative flex flex-row gap-4 bg-[#E8F4FD] p-4 rounded-lg shadow-sm">
                                    {/* Number Badge */}
                                    <span className="text-[#FF9C00] font-bold text-3xl flex-shrink-0">{tip.number}</span>
                                    <div className="bg-[#badee9] border-2 border-dashed border-[#0b88b1] rounded-lg p-3 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                                            {tip.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            {tip.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Two Images */}
                            <div className={`w-[65%] flex flex-row gap-6 justify-center items-center ${isEven ? 'order-2' : 'order-1'}`}>
                                {/* First Image */}
                                {tip.products[0].link ? (
                                    <div 
                                        className="flex-1 flex items-center justify-center h-80 cursor-pointer hover:opacity-75 transition-opacity"
                                        onClick={() => window.open(tip.products[0].link, '_blank', 'noopener,noreferrer')}
                                    >
                                        <CustomImage
                                            src={tip.products[0].image}
                                            alt={tip.products[0].label}
                                            className="w-full h-full object-contain"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center h-80">
                                        <CustomImage
                                            src={tip.products[0].image}
                                            alt={tip.products[0].label}
                                            className="w-full h-full object-contain"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                )}

                                {/* Second Image */}
                                {tip.products[1].link ? (
                                    <div 
                                        className="flex-1 flex items-center justify-center h-80 cursor-pointer hover:opacity-75 transition-opacity"
                                        onClick={() => window.open(tip.products[1].link, '_blank', 'noopener,noreferrer')}
                                    >
                                        <CustomImage
                                            src={tip.products[1].image}
                                            alt={tip.products[1].label}
                                            className="w-full h-full object-contain"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center h-80">
                                        <CustomImage
                                            src={tip.products[1].image}
                                            alt={tip.products[1].label}
                                            className="w-full h-full object-contain"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Layout */}
                        <div className="lg:hidden">
                            {/* Content Box - Row layout like desktop */}
                            <div className="relative flex flex-row gap-2 sm:gap-4 bg-[#E8F4FD] p-3 sm:p-4 rounded-lg mb-4">
                                {/* Number Badge */}
                                <span className="text-[#FF9C00] font-bold text-2xl sm:text-3xl flex-shrink-0 text-left pr-2">{tip.number}</span>
                                <div className="bg-[#badee9] border-2 border-dashed border-[#0b88b1] rounded-lg p-2 sm:p-3 shadow-sm flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                        {tip.description}
                                    </p>
                                </div>
                            </div>

                            {/* Two Images - Side by side on mobile */}
                            <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
                                {/* First Image */}
                                {tip.products[0].link ? (
                                    <div 
                                        className="flex-1 flex items-center justify-center h-48 sm:h-56 cursor-pointer hover:opacity-75 transition-opacity"
                                        onClick={() => window.open(tip.products[0].link, '_blank', 'noopener,noreferrer')}
                                    >
                                        <CustomImage
                                            src={tip.products[0].image}
                                            alt={tip.products[0].label}
                                            className="w-full h-full object-contain"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center h-48 sm:h-56">
                                        <CustomImage
                                            src={tip.products[0].image}
                                            alt={tip.products[0].label}
                                            className="w-full h-full object-contain"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                )}

                                {/* Second Image */}
                                {tip.products[1].link ? (
                                    <div 
                                        className="flex-1 flex items-center justify-center h-48 sm:h-56 cursor-pointer hover:opacity-75 transition-opacity"
                                        onClick={() => window.open(tip.products[1].link, '_blank', 'noopener,noreferrer')}
                                    >
                                        <CustomImage
                                            src={tip.products[1].image}
                                            alt={tip.products[1].label}
                                            className="w-full h-full object-contain"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center h-48 sm:h-56">
                                        <CustomImage
                                            src={tip.products[1].image}
                                            alt={tip.products[1].label}
                                            className="w-full h-full object-contain"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BreedDietTips;
