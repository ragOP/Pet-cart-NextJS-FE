"use client";

import React from "react";
import BlogCard from "./BlogCard";
import PawIcon from "@/icons/PawIcon";

const BlogRecommendations = ({ classname }) => {
    // Sample data for "You May Also Like" section
    const recommendedBlogs = [
        {
            id: "rec1",
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tags: ["DogNutrition", "FeedingGuide", "RawFood"],
            title: "Raw vs Kibble: Which Diet Is Best for Your Dog?",
            author: "Parth Panjwani",
            date: "July 9, 2025",
            shares: "1K",
            description: "Explore the pros, cons, and vet-backed insights to help you decide what goes in your pup's bowl."
        },
        {
            id: "rec2",
            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tags: ["SensitiveDogs", "DogFoodReviews", "Wellness"],
            title: "Top 5 Vet-Approved Dog Foods for Sensitive Stomachs",
            author: "Parth Panjwani",
            date: "June 22, 2025",
            shares: "14K",
            description: "If your dog has digestive issues, this list of gentle, nutritious picks will help ease mealtime stress."
        },
        {
            id: "rec3",
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tags: ["CatTraining", "CatCare", "PositiveReinforcement"],
            title: "Stop the Scratch: Training Your Cat to Use a Scratching Post",
            author: "Parth Panjwani",
            date: "July 2, 2025",
            shares: "8K",
            description: "Learn effective techniques to redirect your cat's natural scratching behavior to appropriate surfaces."
        },
        {
            id: "rec4",
            image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tags: ["CatCare", "Wellness", "Behavior"],
            title: "Essential Cat Care Tips for New Pet Parents",
            author: "Parth Panjwani",
            date: "June 15, 2025",
            shares: "12K",
            description: "Everything you need to know about caring for your new feline friend, from nutrition to enrichment."
        },
        {
            id: "rec5",
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tags: ["DogTraining", "Behavior", "PositiveReinforcement"],
            title: "Understanding Your Dog's Body Language",
            author: "Parth Panjwani",
            date: "June 8, 2025",
            shares: "9K",
            description: "Decode your dog's signals and build a stronger bond through better communication."
        },
        {
            id: "rec6",
            image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tags: ["PetHealth", "Wellness", "Nutrition"],
            title: "The Complete Guide to Pet Nutrition Mistakes",
            author: "Parth Panjwani",
            date: "May 30, 2025",
            shares: "15K",
            description: "Common nutrition mistakes pet owners make and how to fix them for better health outcomes."
        }
    ];

    return (
        <div className={`py-2 px-4 md:px-8 lg:px-16 ${classname}`} >
            <div className="max-w-7xl mx-auto">

                {/* "You May Also Like" Section */}
                <section>
                    <div className="flex items-center gap-2 mb-2">
                        <PawIcon />

                        <h2 className="text-[32px] mt-1 text-[#0888B1]  font-bold ">You May Also Like</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedBlogs.map((blog, index) => (
                            <div key={blog.id}>
                                <BlogCard
                                    image={blog.image}
                                    tags={blog.tags}
                                    title={blog.title}
                                    author={blog.author}
                                    date={blog.date}
                                    shares={blog.shares}
                                    description={blog.description}
                                    isHovered={false}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div >
    );
};

export default BlogRecommendations; 