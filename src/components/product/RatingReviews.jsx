import React from "react";
import { Star, Heart } from "lucide-react";

const RatingReviews = ({ averageRating = "5.0", reviewCount = "112" }) => {
  const rating = parseFloat(averageRating);
  const count = parseInt(reviewCount);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {/* {count === 0 ? (
          <>
            <span className="text-[#181818] italic">No ratings yet</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-gray-300"
                  strokeWidth={1}
                />
              ))}
            </div>
            <span className="text-[#323232] underline">0 Reviews</span>
          </>
        ) : ( */}
          <>
            <div className="flex items-center gap-1 px-2 py-1">
              <Star className="w-4 h-4 fill-yellow-500 text-white" />
              <span className="text-yellow-500 font-bold text-base">
                {rating % 1 === 0 ? rating.toString() : averageRating}/5
              </span>
            </div>
            <span className="text-black text-sm">
              ({reviewCount} Reviews)
            </span>
          </>
         {/* )} */}
      </div>
      {/* <button className="ml-auto p-2 border-2 border-orange-400 rounded-lg hover:bg-orange-50">
        <Heart className="w-5 h-5 text-orange-400" />
      </button> */}
    </div>
  );
};

export default RatingReviews;

