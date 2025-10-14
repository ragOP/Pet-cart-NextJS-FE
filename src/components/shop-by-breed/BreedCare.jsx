import React from 'react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from '@/components/PawsTitle';

const BreedCare = ({ breed }) => {
    // Fallback if training data is not provided
    if (!breed?.training) {
        return null;
    }

    const { training } = breed;
    const careTips = training.tips || [];

    return (
        <div className="relative mt-8 mb-8">
            {/* Title and Subtitle Section */}
            <div className="px-[5%] mb-4 lg:mb-0">
                <PawsTitle title={training.title || `${breed.name} TRAINING`} classNameTitle={"text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] pt-2 "} imageProps={{
                    height: 60,
                    width: 60,
                    className: "inline-block mr-0 h-8"
                }} />
                {training.subtitle && (
                    <p className="text-base lg:text-[1.35rem] mt-2 sm:mt-4" style={{ color: '#004e6a' }}>
                        {training.subtitle}
                    </p>
                )}
            </div>

            {/* Original Flex Row - Image and Text */}
            <div className="px-[5%] mb-8">
                <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 h-auto lg:h-[60vh]">
                    {/* Left Side - Image */}
                    <div className="w-full lg:w-[40%] relative flex justify-center lg:justify-start h-40 sm:h-48 lg:h-full">
                        <CustomImage
                            src={training.image || '/gm-4.png'}
                            alt={`${breed.name} - Care`}
                            className="w-full h-full object-contain relative"
                        />
                    </div>

                    {/* Right Side - Text Content */}
                    <div className='w-full lg:w-[60%] flex flex-col justify-center'>
                        <div className='w-full lg:w-[80%] lg:ml-auto flex flex-col justify-center px-4 lg:px-0'>
                            <p 
                                className="leading-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800"
                                dangerouslySetInnerHTML={{ __html: training.mainDescription }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Care Tips Cards - Similar to BreedDietTips */}
            <div className="relative">
                {careTips.map((tip, index) => {
                    const isEven = index % 2 === 0; // 0 = left side, 1 = right side

                    return (
                        <div key={tip.id} className="mb-24">
                            {/* Desktop Layout */}
                            <div className="hidden lg:flex flex-row gap-8 items-center">
                                {/* Left Side - Content Box */}
                                <div className={`w-[35%] ${isEven ? 'order-1' : 'order-2'}`}>
                                    <div className="relative flex flex-row gap-4 bg-[#E8F4FD] p-4 rounded-lg shadow-sm">
                                        {/* Number Badge */}
                                        <span className="text-[#FF9C00] font-bold text-3xl flex-shrink-0">{tip.id}</span>
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
                                <div className={`w-[65%] flex flex-row gap-6 justify-center items-center h-48 ${isEven ? 'order-2' : 'order-1'}`}>
                                    {/* First Image */}
                                    {tip.products && tip.products[0] && (
                                        <div className="flex-1 flex items-center justify-center">
                                            <CustomImage
                                                src={tip.products[0].image || "/gm-3.png"}
                                                alt={tip.products[0].label || "Care Product 1"}
                                                className="object-contain"
                                                width={300}
                                                height={192}
                                            />
                                        </div>
                                    )}

                                    {/* Second Image */}
                                    {tip.products && tip.products[1] && (
                                        <div className="flex-1 flex items-center justify-center">
                                            <CustomImage
                                                src={tip.products[1].image || "/gm-3.png"}
                                                alt={tip.products[1].label || "Care Product 2"}
                                                className="object-contain"
                                                width={300}
                                                height={192}
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
                                    <span className="text-[#FF9C00] font-bold text-2xl sm:text-3xl flex-shrink-0 text-left pr-2">{tip.id}</span>
                                    <div className="bg-[#badee9] border-2 border-dashed border-[#0b88b1] rounded-lg p-2 sm:p-3 shadow-sm flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
                                            {tip.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                            {tip.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Two Images */}
                                <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center h-48 sm:h-56">
                                    {/* First Image */}
                                    {tip.products && tip.products[0] && (
                                        <div className="flex-1 flex items-center justify-center">
                                            <CustomImage
                                                src={tip.products[0].image || "/gm-3.png"}
                                                alt={tip.products[0].label || "Care Product 1"}
                                                className="w-full h-full object-contain"
                                                width={150}
                                                height={200}
                                            />
                                        </div>
                                    )}

                                    {/* Second Image */}
                                    {tip.products && tip.products[1] && (
                                        <div className="flex-1 flex items-center justify-center">
                                            <CustomImage
                                                src={tip.products[1].image || "/gm-3.png"}
                                                alt={tip.products[1].label || "Care Product 2"}
                                                className="w-full h-full object-contain"
                                                width={150}
                                                height={200}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BreedCare;
