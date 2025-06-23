import React from 'react'
import CategoryBanner from '@/components/category/CategoryBanner'
import FilterSidebar from '@/components/category/FilterSidebar'
import ProductCard from '@/components/category/ProductCard'
import SortingBar from '@/components/category/SortingBar'
import Applod from "@/components/home/Applod";
import TopFilterBar from '@/components/category/TopFilterBar'

const dummyProducts = new Array(12).fill({
    isBestseller: true,
    image: "/product.png",
    name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
    brand: "Applod",
    rating: 5.0,
    isVeg: true,
    variants: [
      "14x3Kg | 10% OFF",
      "10x500gm | 70% OFF",
      "14x30Kg | 90% OFF",
      "9x5Kg | 2% OFF",
    ],
    price: 5000,
    mrp: 5900,
    discount: "70% OFF",
    deliveryDate: "Friday, 13ᵗʰ June",
  })

export default function ProductListPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF6] px-6">
      <CategoryBanner />
        <TopFilterBar />
      <div className="flex max-w-[1440px] mx-auto ">
        <FilterSidebar />
        <div className="flex-1 ml-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {dummyProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
