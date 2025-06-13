'use client';

import React from 'react';
import pawLogo from '@/assets/essential/paws-logo.png';
import trendingSnacks from '@/assets/trending/snacks.png';
import trendingCatToys from '@/assets/trending/cat-toys.png';
import trendingDogToys from '@/assets/trending/dog-toys.png';
import trendingBedding from '@/assets/trending/bedding.png';
import trendingDogTreats from '@/assets/trending/dog-treats.png';
import trendingCare from '@/assets/trending/care.png';
import CustomImage from '@/components/images/CustomImage';

const trendingItems = [
    { id: 1, image: trendingSnacks, label: 'Snacks & Treat' },
    { id: 2, image: trendingCatToys, label: 'Cat Toys' },
    { id: 3, image: trendingDogToys, label: 'Dog Toys' },
    { id: 4, image: trendingBedding, label: 'Bedding' },
    { id: 5, image: trendingDogTreats, label: 'Dog Treats' },
    { id: 6, image: trendingCare, label: 'Care Products' },
    { id: 7, image: trendingCare, label: 'Care Products' },
    { id: 8, image: trendingCare, label: 'Care Products' },
];

function Trending() {
    return (
        <div className="w-full px-4 py-6">
            {/* Title */}
            <h2 className="font-bold mb-4 text-[28px] font-gotham-rounded leading-[28.5px] tracking-[0.57px] align-middle">
                <span className="text-yellow-500">
                    <CustomImage src={pawLogo} alt="Paw Logo" className="inline-block mr-0 h-6" />
                </span>
                <span className="text-[#F59A11]"> Trending </span>
                <span className="text-[#0888B1]">Add-To-Carts</span>
            </h2>

            {/* Scrollable items */}
            <div className="overflow-x-auto hide-scrollbar">
                <div className="flex gap-4 w-max">
                    {trendingItems.map((item) => (
                        <div key={item.id} className="flex flex-col items-center min-w-[150px]">
                            <CustomImage
                                src={item.image}
                                alt={item.label}
                                className="w-36 h-36 object-cover rounded-xl border-x-[2px] border-x-[#F59A1166]"
                            />
                            <p className="text-sm mt-2 font-medium text-[#181818] text-center">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Trending;
