import React from 'react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from "../PawsTitle";

const BreedTraits = ({ breed }) => {
    // Return null if traits data not provided
    if (!breed?.traits) {
        return null;
    }

    const { traits } = breed;

    return (
        <div className="flex flex-col gap-4 sm:gap-6 px-[5%] mt-8">
            <PawsTitle title={"TRAITS"} classNameTitle={"text-[28px] sm:text-[32px] md:text-[36px] pt-2 font-bold"} imageProps={{
                height: 60,
                width: 60,
                className: "inline-block mr-0 h-8"
            }} />

            <div className="flex flex-col gap-4 sm:gap-6">
                <p className="text-gray-700 leading-tight text-2xl sm:text-xl text-left w-full lg:w-[70%]">
                    {traits.description}
                </p>
            </div>

            {/* Trait Image - Centered for both mobile and desktop */}
            <div className="flex items-center justify-center w-full mt-4">
                <CustomImage
                    src={traits.image || '/trait-img.png'}
                    alt={`${breed.name} breed traits`}
                    className="object-contain"
                    width={600}
                    height={400}
                />
            </div>
        </div>
    );
};

export default BreedTraits;