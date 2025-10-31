import React from 'react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from '@/components/PawsTitle';

const BreedHomeCookedFood = ({ breed }) => {
    // Fallback data if homeCookedFood info is not provided
    if (!breed?.homeCookedFood) {
        return null;
    }

    const { homeCookedFood } = breed;

    return (
        <div className="relative px-[5%] mt-4 mb-4 lg:mt-8 lg:mb-0 h-auto lg:h-[60vh]">
            {/* Title and Description Section */}
            <div className="mb-2 lg:mb-0 flex ">
                <PawsTitle title={homeCookedFood.title || "HOME-COOKED FOOD"} classNameTitle={"text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] pt-2 "} imageProps={{
                    height: 60,
                    width: 60,
                    className: "mr-0 h-8 flex flex-row items-center"
                }} />
            </div>

            {/* Flex Row - Text and Image */}
            <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 h-auto lg:h-[60vh]">
                {/* Left Side - Text Content */}
                <div className='w-full lg:w-[60%] flex flex-col justify-center'>
                    <div className='w-full lg:w-[80%] flex flex-col justify-center px-4 lg:px-0'>
                        <p 
                            className="leading-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800"
                            dangerouslySetInnerHTML={{ __html: homeCookedFood.description }}
                        />
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full lg:w-[40%] relative flex justify-center lg:justify-end h-60 sm:h-48 lg:h-full">
                    <CustomImage
                        src={homeCookedFood.image || '/gm-8.png'}
                        alt={`${breed.name} - Home Cooked Food`}
                        className="w-full h-full object-contain relative"
                    />
                </div>
            </div>
        </div>
    );
};

export default BreedHomeCookedFood;
