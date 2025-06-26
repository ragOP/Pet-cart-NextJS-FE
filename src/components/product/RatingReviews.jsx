import React from "react";
import { Star, Heart } from "lucide-react";

const RatingReviews = ({ averageRating = "5.0", reviewCount = "112" }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-medium">{averageRating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-black font-medium underline">
          {reviewCount} Reviews
        </span>
      </div>
      <button className="ml-auto p-2 border border-orange-400 rounded-lg hover:bg-orange-50">
        <Heart className="w-5 h-5 text-orange-400" />
      </button>
    </div>
  );
};

export default RatingReviews;
