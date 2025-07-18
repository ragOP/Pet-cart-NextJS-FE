"use client";

import React from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";

const BlogProductSection = () => {
  const product = {
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: "5.0",
    name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
    brand: "Applod",
    isVegetarian: true,
    options: [
      { size: "14x3Kg", discount: "10% OFF" },
      { size: "10x500gm", discount: "70% OFF" }
    ],
    price: "₹5000",
    mrp: "₹259000",
    discount: "70% OFF",
    date: "FRIDAY, 13 JUNE"
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Two Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Product Card 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="bg-[#004E6A] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
              {product.tag}
            </div>
            <div className="relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
            {product.isVegetarian && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Vegetarian</span>
              </div>
            )}
            <div className="space-y-2 mb-4">
              {product.options.map((option, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{option.size}</span>
                  <span className="text-green-600 font-semibold">{option.discount}</span>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                <span className="text-lg text-gray-500 line-through">{product.mrp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">{product.discount}</span>
                <span className="text-sm text-gray-600">{product.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
              <button className="flex-1 bg-[#B4700A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#A36609] transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="bg-[#004E6A] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
              {product.tag}
            </div>
            <div className="relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
            {product.isVegetarian && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Vegetarian</span>
              </div>
            )}
            <div className="space-y-2 mb-4">
              {product.options.map((option, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{option.size}</span>
                  <span className="text-green-600 font-semibold">{option.discount}</span>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                <span className="text-lg text-gray-500 line-through">{product.mrp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">{product.discount}</span>
                <span className="text-sm text-gray-600">{product.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
              <button className="flex-1 bg-[#B4700A] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#A36609] transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>
        </div>

        {/* Large Dog Image */}
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Dog being fed treat"
            className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Text Sections */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              5. Your Energy Affects Them—A Lot
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Dogs are emotional sponges. If you're anxious, they pick up on it. Calm, assertive energy helps them feel secure. They don't need a perfect owner—they need a present one.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              6. Food Isn't Just Fuel—It's Love (and Health)
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              What you feed your dog impacts not just their weight, but their skin, coat, behavior, and lifespan. Bonus tip: many human foods are toxic to dogs (looking at you, grapes and onions). Always double-check.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogProductSection; 