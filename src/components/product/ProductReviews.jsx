"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import CustomerFeedbackIcon from "@/icons/CustomerFeedbackIcon";

const StarRating = ({ filled }) => {
  return (
    <svg
      className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
};

const RatingBar = ({ rating, percentage, count }) => (
  <div className="flex items-center gap-2 mb-2 group">
    <div className="flex items-center gap-1 w-24">
      {[...Array(5)].map((_, i) => (
        <StarRating key={i} filled={i < rating} />
      ))}
    </div>
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out group-hover:bg-yellow-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <span className="text-sm text-gray-600 w-16">{`(${count})`}</span>
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="border border-[#B3B3B3] rounded-lg p-4 ">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center uppercase font-semibold">
        {review.name[0]}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarRating key={i} filled={i < review.rating} />
            ))}
          </div>
          <span className="text-sm text-gray-500">{review.date}</span>
        </div>
        <h4 className="font-semibold">{review.name} <span className="text-gray-600 font-normal">({review.location})</span></h4>
      </div>
    </div>
    <p className="text-gray-700">{review.comment}</p>
  </div>
);

const ProductReviews = ({ reviews = [], totalReviews = 118 }) => {
  const [sortBy, setSortBy] = useState("Most Recent");

  // Calculate rating percentages
  const ratingCounts = {
    5: 83,
    4: 83,
    3: 83,
    2: 83,
    1: 83,
  };

  const sampleReviews = [
    {
      name: "Esuni",
      rating: 5,
      date: "16/05/2025",
      verified: true,
      location: "Mumbai, India",
      comment:
        "Hearty Oven-Baked Dry Food For Adult Dogs With Chicken, Duck & Brown Rice (All Breeds)",
    },
    {
      name: "Arpit pandya",
      rating: 5,
      date: "02/05/2025",
      verified: true,
      location: "Ahmedabad, India",
      comment: "Not delivered\nNo delivery has attempted",
    },
    {
      name: "Jasmine",
      rating: 4,
      date: "02/05/2025",
      location: "Gurugram, India",
      comment:
        "Comfort Food for Pets\nSo first of all - the kibble isn't just any random shape, it's heart-shaped - which is honestly so cool and thoughtful!! Perfect for busy mornings or travel days, and my dogs lick their bowls clean every single time. Everything is vet-approved too, so that's a big plus in my book.",
    },
  ];

  const sortOptions = [
    "Most Recent",
    "Highest Rating",
    "Lowest Rating",
    "Most Helpful",
  ];

  const handleSort = (option) => {
    setSortBy(option);
    // Add sorting logic here based on the option
    let sortedReviews = [...sampleReviews];
    switch (option) {
      case "Highest Rating":
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "Lowest Rating":
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
      case "Most Recent":
        sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 md:p-6 my-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <CustomerFeedbackIcon />
            <span className="text-2xl font-semibold">Customer Reviews</span>
          </div>
        </div>

        <div className="flex  flex-col items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarRating key={i} filled={i < 1} />
            ))}
          </div>
          <span className="ml-2 text-base font-normal text-gray-600">
            Based On {totalReviews} Reviews
          </span>
        </div>
      </div>

      <div className="mb-6 flex flex-row justify-between items-start gap-4">
        <div className="w-1/2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <RatingBar
              key={rating}
              rating={rating}
              percentage={88}
              count={ratingCounts[rating]}
            />
          ))}
        </div>

        <div className="flex-1 flex justify-end">
          <Button
            variant="outline"
            className="border-[#F59A1133] hover:bg-orange-50 hover:border-orange-300 transition-colors"
          >
            Write A Review
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-gray-700 border-[#F59A1133] hover:bg-orange-50"
            >
              {sortBy} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleSort(option)}
                className="cursor-pointer hover:bg-orange-50"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {sampleReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
