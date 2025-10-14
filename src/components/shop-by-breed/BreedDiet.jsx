import React from 'react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from '@/components/PawsTitle';

const BreedDiet = ({ breed }) => {
    // Fallback data if diet info is not provided
    if (!breed?.diet) {
        return null;
    }

    const { diet } = breed;

    return (
        <div className="relative px-[5%] mt-4 mb-4 lg:mt-8 lg:mb-0 h-auto lg:h-[70vh]">
            {/* Title and Subtitle Section */}
            <div className="mb-2 lg:mb-0">
                <PawsTitle title={diet.title || "DIET"} classNameTitle={"text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] pt-2 "} imageProps={{
                    height: 60,
                    width: 60,
                    className: "inline-block mr-0 h-8"
                }} />
                {diet.subtitle && (
                    <p className="text-base lg:text-[1.35rem] mt-2 sm:mt-4" style={{ color: '#004e6a' }}>
                        {diet.subtitle}
                    </p>
                )}
            </div>

            {/* Flex Row - Image and Text */}
            <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 h-auto lg:h-[60vh]">
                {/* Left Side - Image */}
                <div className="w-full lg:w-[40%] relative flex justify-center lg:justify-start h-40 sm:h-48 lg:h-full">
                    <CustomImage
                        src={diet.image || '/gm-2.png'}
                        alt={`${breed.name} - Diet`}
                        className="w-full h-full object-contain relative"
                    />
                </div>

                {/* Right Side - Text Content */}
                <div className='w-full lg:w-[60%] flex flex-col justify-center'>
                    <div className='w-full lg:w-[80%] lg:ml-auto flex flex-col justify-center px-4 lg:px-0'>
                        <p 
                            className="leading-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800"
                            dangerouslySetInnerHTML={{ __html: diet.mainDescription }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreedDiet;
