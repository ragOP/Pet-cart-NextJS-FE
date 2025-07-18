"use client";

import React, { useState } from "react";
import PawIcon from "@/icons/PawIcon";

const PickYourPet = () => {
    const [activeCategory, setActiveCategory] = useState("Dogs");

    const categories = ["Dogs", "Cats", "Elephant", "Parrot", "Capybara", "Rabbit", "Platypus"];

    const sidebarBlogs = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            title: "Tips, training & tail wags",
            date: "21 March 2021"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            title: "Care, behavior & kitty hacks",
            date: "21 March 2021"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            title: "Smart care for happy chirps",
            date: "21 March 2021"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            title: "Big care for little paws",
            date: "21 March 2021"
        }
    ];

    return (
        <div className="py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex items-center gap-2 mb-2">
                    <PawIcon />

                    <h2 className="text-[32px] mt-1 text-[#0888B1]  font-bold ">Pick Your Pet, Read Your Blog</h2>
                </div>

                {/* Category Navigation/Tabs - List Style */}
                <div className="flex border-b border-gray-200 mb-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 text-sm font-medium transition-colors relative ${activeCategory === category
                                ? 'text-[#004E6A] border-b-2 border-[#B4700A]'
                                : 'text-[#121416] hover:text-[#004E6A]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Main Content Area - White Background with Border */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left Section - Banner Image */}
                        <div className="w-full lg:w-3/4 ">
                            <div className="transition-all duration-300 cursor-pointer group">
                                {/* Banner Image */}
                                <div className="relative h-64 md:h-80 mb-4 rounded-lg overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt="Featured blog post"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <div className="text-sm text-gray-500">1 Month Ago</div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                                        Raw vs Kibble: Which Diet Is Best for Your Dog?
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Explore the pros, cons, and vet-backed insights to help you decide what goes in your pup's bowl—because the right food isn't just about flavor, it's about fueling their energy, health, and happiness every single day. From kibble to raw diets, get clarity on what's best for your best friend.
                                    </p>
                                    <div className="flex">
                                        <button className="text-[#004E6A] font-medium text-sm hover:text-[#003D55] transition-colors underline decoration-[#B4700A] decoration-2 underline-offset-4 hover:decoration-[#A36609]">
                                            View Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Cards */}
                        <div className="w-full lg:w-1/4">
                            <div className="space-y-6">
                                {sidebarBlogs.map((blog) => (
                                    <div key={blog.id} className="transition-all duration-300 hover:shadow-lg p-1  hover:rounded-sm hover:scale-[1.02] hover:ring-2 hover:ring-blue-500 cursor-pointer group">
                                        <div className="flex gap-4">
                                            {/* Blog Image */}
                                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Blog Content */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors leading-tight group-hover:text-blue-600">
                                                    {blog.title}
                                                </h4>
                                                <div className="text-sm text-gray-500">
                                                    {blog.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PickYourPet; 