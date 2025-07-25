import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Card className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      {/* Bestseller Badge */}
      {product.isBestseller && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-semibold px-2 py-1 rounded-sm z-10">
          BESTSELLER
        </div>
      )}

      {/* Product Image */}
      <div className="bg-[#F6F6F6] flex justify-center items-center p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={160}
          height={160}
          className="object-contain"
        />
      </div>

      <CardContent className="space-y-1 px-3 py-2">
        {/* Rating and Veg/NonVeg */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-yellow-500 text-sm font-medium">
            <Star size={14} fill="currentColor" className="mr-1" />
            {product.rating}
          </div>
          {product.isVeg && (
            <Image
              src="/veg.png"
              alt="veg"
              width={16}
              height={16}
              className="object-contain"
            />
          )}
        </div>

        {/* Product Name */}
        <div className="text-sm font-semibold leading-tight line-clamp-2">
          {product.name}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>

        {/* Variants */}
        <div className="flex flex-wrap gap-1 pt-1">
          {product.variants.map((variant, idx) => (
            <Badge key={idx} variant="outline" className="text-[11px] px-2">
              {variant}
            </Badge>
          ))}
        </div>

        {/* Price Section */}
        <div className="flex justify-between items-center pt-2">
          <div>
            <div className="text-sm font-bold text-green-600">₹{product.price}</div>
            <div className="text-xs text-gray-500 line-through">₹{product.mrp}</div>
          </div>

          <Badge
            className="text-white bg-blue-600 text-[11px] font-bold"
            variant="default"
          >
            {product.discount}
          </Badge>
        </div>

        {/* Delivery Date */}
        <div className="text-xs pt-1 text-yellow-600 flex items-center gap-1 font-medium">
          ⚡ {product.deliveryDate}
        </div>

        {/* Add to Cart Button */}
        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" size="icon" className="rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-100">
            <Heart size={18} />
          </Button>
          <Button className="w-[80%] bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold">
            ADD TO CART
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
