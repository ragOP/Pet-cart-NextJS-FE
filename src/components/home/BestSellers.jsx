"use client";

import React, { useEffect, useState } from "react";
import offIcon from "@/assets/bestseller/off.png";
import applodJar from "@/assets/bestseller/applod-jar.png";
import vegIcon from "@/assets/bestseller/veg-icon.png";
import paswIcon from "@/assets/bestseller/paws.png";
import heartIcon from "@/assets/bestseller/heart.png";
import starIcon from "@/assets/bestseller/Vector.png";
import CustomImage from "@/components/images/CustomImage";
import CustomCarousel from "@/components/carousel/CustomCarousel";
import "@/styles/hide-scrollbar.css";
import { Heart } from "lucide-react";
import BestSellerProduct from "@/components/product/BestSellerProduct";
import { Skeleton } from "../ui/skeleton";
import { fetchProducts } from "@/helpers/home";

function BestSellers() {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
  //     price: 5000,
  //     rating: 5.0,
  //     image: applodJar,
  //     discount: "70% OFF",
  //   },
  //   {
  //     id: 2,
  //     name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
  //     price: 5000,
  //     rating: 5.0,
  //     image: applodJar,
  //     discount: "70% OFF",
  //   },
  //   {
  //     id: 3,
  //     name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
  //     price: 5000,
  //     rating: 5.0,
  //     image: applodJar,
  //     discount: "70% OFF",
  //   },
  //   {
  //     id: 4,
  //     name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
  //     price: 5000,
  //     rating: 5.0,
  //     image: applodJar,
  //     discount: "70% OFF",
  //   },
  //   {
  //     id: 5,
  //     name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
  //     price: 5000,
  //     rating: 5.0,
  //     image: applodJar,
  //     discount: "70% OFF",
  //   },
  //   {
  //     id: 6,
  //     name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
  //     price: 5000,
  //     rating: 5.0,
  //     image: applodJar,
  //     discount: "70% OFF",
  //   },
  //   {
  //     id: 7,
  //     name: "Applod Crunch-a-Licious Gluten Free Chicken & Cheese Dog Biscuits",
  //     price: 5000,
  //     rating: 5.0,
  //     image: applodJar,
  //     discount: "70% OFF",
  //   },
  // ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const paramInitialState = {
    page: 1,
    per_page: 50,
    search: "",
    max_price: 3000,
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts({ params: paramInitialState }).then((data) => {
      setProducts(data?.data);
      setLoading(false);
    });
  }, []);

  console.log(products);

  return (
    <div className="w-full px-4 py-8 bg-white">
      {/* Header */}
      <div className="font-bold mb-4 font-gotham-rounded text-[28px] leading-[28.5px] tracking-[0.57px] align-middle flex flex-row gap-2">
        <CustomImage
          src={paswIcon}
          alt="Paw Logo"
          className="inline-block mr-0 h-6"
          width={50}
          height={60}
        />
        <span className="space-x-2">
          <span className="text-[#F59A11]">Bestsellers</span>
          <span className="text-[#0888B1]">Under ₹599</span>
        </span>
      </div>

      {/* Carousel */}
      <CustomCarousel
        className="hide-scrollbar"
        contentClassName="gap-4"
        itemClassName="min-w-[250px] max-w-[250px]"
        showArrows={true}
      >
        {/* {products.map((product) => (
          <BestSellerProduct
            key={product.id}
            product={{
              ...product,
              starIcon,
              vegIcon,
              offIcon,
            }}
          />
        ))} */}
        {loading ? (
          <div className="flex flex-row gap-4">
            <Skeleton className="min-w-[250px] max-w-[250px] h-[300px]" />
            <Skeleton className="min-w-[250px] max-w-[250px] h-[300px]" />
            <Skeleton className="min-w-[250px] max-w-[250px] h-[300px]" />
            <Skeleton className="min-w-[250px] max-w-[250px] h-[300px]" />
          </div>
        ) : (
          products.map((product) => (
            <BestSellerProduct
              key={product._id}
              product={{
                ...product,
                starIcon,
                vegIcon,
                offIcon,
              }}
            />
          ))
        )}
      </CustomCarousel>
    </div>
  );
}

export default BestSellers;
