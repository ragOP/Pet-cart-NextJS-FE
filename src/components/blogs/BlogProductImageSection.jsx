"use client";

import React from "react";
import ProductCard from "@/components/category/ProductCard";

const BlogProductImageSection = () => {
    const products = [
        {
            id: 1,
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
        },
        {
            id: 2,
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
        }
    ];

    return (
        <div className="w-full px-4 md:px-8 lg:px-16 py-12 bg-white">
            <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left side - Product cards */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    </div>

                              {/* Right side - Large image */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-lg h-full">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Woman with dog in grassy field"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
                </div>
            </div>
        </div>
    );
};

export default BlogProductImageSection; 