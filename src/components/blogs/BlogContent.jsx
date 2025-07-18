"use client";

import React from "react";
import { Eye, Share2, Heart, Star, ShoppingCart } from "lucide-react";
import QuoteIcon from "@/icons/QuoteIcon";
import ProductCard from "@/components/category/ProductCard";

const BlogContent = ({ blog }) => {
    // Dynamic blog data structure
    const getBlogData = (blogId) => {
        const blogDataMap = {
            "everything-you-wish-you-knew-about-dogs": {
                title: "EVERYTHING YOU WISH YOU KNEW ABOUT DOGS",
                subtitle: "From training tips to nutrition guides - get the answers no one told you, but your dog needs you to know.",
                author: "Parth Panjwani",
                views: "1.6K",
                shares: "1.2K",
                content: [
                    {
                        id: 1,
                        title: "Your Dog Understands More Than You Think",
                        text: "A paragraph explains that dogs understand many words, tone, body language, and emotions, clarifying that 'guilt' is often a reaction to disappointment."
                    },
                    {
                        id: 2,
                        title: "Tail Wagging Doesn't Always Mean Happiness",
                        text: "A paragraph differentiates between types of tail wags, explaining that a fast, stiff wag indicates agitation, while a wide, swoopy wag with a relaxed body signifies happiness."
                    },
                    {
                        id: 3,
                        title: "Dogs Can Get Jealous (and Dramatic)",
                        text: "A paragraph explains that dogs can show jealousy, especially when attention is given to other pets or phones, and suggests that dropping a toy is a bid for affection."
                    },
                    {
                        id: 4,
                        title: "They Dream Just Like We Do",
                        text: "A paragraph describes how dogs experience REM sleep and dream, often reliving daily activities like fetch."
                    }
                ],
                embeddedImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                quote: "DOGS DON'T NEED PERFECTION. THEY JUST NEED LOVE, PATIENCE, AND MAYBE A SQUEAKY TOY OR TWO. WHETHER YOUR DOG IS A GENTLE GIANT, A MISCHIEVOUS MUTT, OR A HIGH-ENERGY HERDER—THEY'RE FAMILY."
            },
            "raw-vs-kibble-dog-diet": {
                title: "RAW VS KIBBLE: WHICH DIET IS BEST FOR YOUR DOG?",
                subtitle: "Explore the pros, cons, and vet-backed insights to help you decide what goes in your pup's bowl.",
                author: "Parth Panjwani",
                views: "2.1K",
                shares: "1.8K",
                content: [
                    {
                        id: 1,
                        title: "Understanding Raw Food Diets",
                        text: "Raw food diets consist of uncooked meat, bones, fruits, and vegetables. Proponents claim it's more natural and nutritious for dogs."
                    },
                    {
                        id: 2,
                        title: "The Benefits of Kibble",
                        text: "Commercial kibble is convenient, nutritionally balanced, and often more affordable than raw diets."
                    },
                    {
                        id: 3,
                        title: "Veterinary Perspectives",
                        text: "Most veterinarians recommend high-quality kibble for its balanced nutrition and safety standards."
                    },
                    {
                        id: 4,
                        title: "Making the Right Choice",
                        text: "Consider your dog's age, health, lifestyle, and your budget when choosing between raw and kibble diets."
                    }
                ],
                embeddedImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                quote: "THE BEST DIET FOR YOUR DOG IS THE ONE THAT KEEPS THEM HEALTHY, HAPPY, AND THRIVING. CONSULT WITH YOUR VET TO FIND THE PERFECT BALANCE."
            },
            "cat-training-scratching-post": {
                title: "STOP THE SCRATCH: TRAINING YOUR CAT TO USE A SCRATCHING POST",
                subtitle: "Learn effective techniques to redirect your cat's natural scratching behavior to appropriate surfaces.",
                author: "Parth Panjwani",
                views: "1.4K",
                shares: "900",
                content: [
                    {
                        id: 1,
                        title: "Understanding Cat Scratching Behavior",
                        text: "Scratching is a natural behavior for cats that helps them mark territory, stretch muscles, and maintain claw health."
                    },
                    {
                        id: 2,
                        title: "Choosing the Right Scratching Post",
                        text: "Select a scratching post that's tall enough for your cat to fully stretch and made from materials they prefer."
                    },
                    {
                        id: 3,
                        title: "Positive Reinforcement Techniques",
                        text: "Use treats, praise, and play to encourage your cat to use the scratching post instead of furniture."
                    },
                    {
                        id: 4,
                        title: "Consistency is Key",
                        text: "Be patient and consistent with training. It may take weeks for your cat to fully adopt the new behavior."
                    }
                ],
                embeddedImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                quote: "PATIENCE AND POSITIVE REINFORCEMENT ARE THE KEYS TO SUCCESSFUL CAT TRAINING. REMEMBER, EVERY CAT LEARNS AT THEIR OWN PACE."
            }
        };

        return blogDataMap[blogId] || blogDataMap["everything-you-wish-you-knew-about-dogs"];
    };

    const blogData = blog ? getBlogData(blog.id) : getBlogData("everything-you-wish-you-knew-about-dogs");

    return (
        <div className="w-full px-4 md:px-8 lg:px-16 py-4 md:py-8">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-[48px] xl:text-[42px] font-bold text-gray-900 mb-2 leading-tight">
                {blogData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-[32px] text-gray-600 mb-4 md:mb-6 leading-tight">
                {blogData.subtitle}
            </p>

            {/* Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
                <div className="flex items-center">
                    <span className="text-gray-700 font-medium text-sm md:text-base">By {blogData.author}</span>
                </div>
                <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs md:text-sm">{blogData.views} views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Share2 className="w-4 h-4" />
                        <span className="text-xs md:text-sm">{blogData.shares} shares</span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
                {blogData.content.map((section, index) => (
                    <div key={section.id} className="mb-6 md:mb-8">
                        <h2 className="text-lg md:text-xl lg:text-[24px] font-bold text-gray-900 mb-1 md:mb-2">
                            {section.id}. {section.title}
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg lg:text-[24px] leading-tight mb-4 md:mb-6">
                            {section.text}
                        </p>

                        {/* Embedded Image and Sidebar after section 2 */}
                        {section.id === 2 && (
                            <div className="my-6 md:my-8">
                                <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
                                    {/* Main Image */}
                                    <div className="w-full lg:flex-1">
                                        <div className="h-[400px] md:h-[450px] lg:h-[500px]">
                                            <img
                                                src={blogData.embeddedImage}
                                                alt="Beagle dog in grassy field"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    {/* Product Sidebar */}
                                    <div className="w-full lg:w-80">
                                        <ProductCard product={{
                                            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                                            name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
                                            brand: "Applod",
                                            rating: "5.0",
                                            price: 259000,
                                            mrp: 259000,
                                            discount: "70% OFF",
                                            deliveryDate: "FRIDAY, 13 JUNE",
                                            isBestseller: true,
                                            isVeg: true,
                                            variants: ["14x3Kg | 10% OFF", "10x500gm | 70% OFF"]
                                        }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Concluding Quote */}
                <div className="mt-8 md:mt-12 flex gap-2 md:gap-4">
                    <div className="flex-shrink-0">
                        <QuoteIcon />
                    </div>
                    <span className="text-lg md:text-xl lg:text-[40px] font-bold text-[#004E6A] leading-tight">
                        {blogData.quote}
                    </span>
                </div>

                {/* Additional sections from the image */}
                <div className="mt-6 md:mt-8">
                    <h2 className="text-lg md:text-xl lg:text-[24px] font-bold text-gray-900 mb-1 md:mb-2">
                        5. Your Energy Affects Them—A Lot
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg lg:text-[24px] leading-tight mb-4 md:mb-6">
                        A paragraph discusses how dogs absorb human emotions, emphasizing that calm energy helps them feel secure and that a "present" owner is more important than a "perfect" one.
                    </p>
                </div>

                <div className="mt-6 md:mt-8">
                    <h2 className="text-lg md:text-xl lg:text-[24px] font-bold text-gray-900 mb-1 md:mb-2">
                        6. Food Isn't Just Fuel—It's Love (and Health)
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg lg:text-[24px] leading-tight mb-4 md:mb-6">
                        The final section highlights the impact of food on a dog's overall health, behavior, and lifespan, with a bonus tip to always double-check for human foods toxic to dogs (like grapes and onions).
                    </p>
                </div>

                {/* Product Section with 2 Cards and Image */}
                <div className="mt-8 md:mt-12">
                    <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                        {/* Left side - 2 Product Cards */}
                        <div className="w-full lg:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Product Card 1 */}
                                <ProductCard
                                    product={{
                                        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                                        name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
                                        brand: "Applod",
                                        rating: "5.0",
                                        price: 259000,
                                        mrp: 259000,
                                        discount: "70% OFF",
                                        deliveryDate: "FRIDAY, 13 JUNE",
                                        isBestseller: true,
                                        isVeg: true,
                                        variants: ["14x3Kg | 10% OFF", "10x500gm | 70% OFF"]
                                    }}
                                />

                                <ProductCard
                                    product={{
                                        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                                        name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
                                        brand: "Applod",
                                        rating: "5.0",
                                        price: 259000,
                                        mrp: 259000,
                                        discount: "70% OFF",
                                        deliveryDate: "FRIDAY, 13 JUNE",
                                        isBestseller: true,
                                        isVeg: true,
                                        variants: ["14x3Kg | 10% OFF", "10x500gm | 70% OFF"]
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right side - Image */}
                        <div className="w-full lg:w-1/3">
                            <div className="h-full">
                                <img
                                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    alt="Dog being fed treat"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogContent; 