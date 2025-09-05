"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import CustomerFeedbackIcon from "@/icons/CustomerFeedbackIcon";
import ReviewModal from "./ReviewModal";
import { checkIfUserBoughtProduct } from "@/app/apis/checkIfUserBoughtProduct";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "@/store/authSlice";
import { openLoginPopup, setLoginRedirectUrl } from "@/store/uiSlice";
import { useRouter } from "next/navigation";

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

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="border border-[#B3B3B3] rounded-lg p-4 ">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center uppercase font-semibold">
          {review.userId?.name?.[0] || 'U'}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarRating key={i} filled={i < review.rating} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
          </div>
          <h4 className="font-semibold">
            {review.userId?.name || 'Anonymous'} {""}
            <span className="text-gray-600 font-normal">
              ({review.orderId?.address?.city}, {" "} {review.orderId?.address?.state})
            </span>
          </h4>
        </div>
      </div>
      <p className="text-gray-700">{review.review}</p>
    </div>
  );
};

const ProductReviews = ({ reviews = {}, productName = "Product", productId }) => {
  const [sortBy, setSortBy] = useState("Most Recent");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [canWriteReview, setCanWriteReview] = useState(false);
  const [isCheckingReviewEligibility, setIsCheckingReviewEligibility] = useState(false);
  const [sortedReviews, setSortedReviews] = useState([]);

  // Authentication state
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkReviewEligibility = async () => {
      // Only check eligibility if user is logged in and productId exists
      if (!isLoggedIn || !productId) {
        setIsCheckingReviewEligibility(false);
        setCanWriteReview(false);
        return;
      }

      setIsCheckingReviewEligibility(true);
      try {
        const response = await checkIfUserBoughtProduct(productId);
        if (response?.success) {
          setCanWriteReview(true);
        } else {
          setCanWriteReview(false);
        }
      } catch (error) {
        console.error("Error checking review eligibility:", error);
        setCanWriteReview(false);
      } finally {
        setIsCheckingReviewEligibility(false);
      }
    };

    checkReviewEligibility();
  }, [productId, isLoggedIn]); // Added isLoggedIn to dependencies

  // Calculate rating statistics from actual data
  const calculateRatingStats = () => {
    const reviewList = reviews.reviews || [];
    const totalReviews = reviews.totalReviews || 0;

    const ratingCounts = {
      5: reviews.totalFiveStar || 0,
      4: reviews.totalFourStar || 0,
      3: reviews.totalThreeStar || 0,
      2: reviews.totalTwoStar || 0,
      1: reviews.totalOneStar || 0,
    };

    // Calculate percentages
    const ratingPercentages = {};
    Object.keys(ratingCounts).forEach(rating => {
      ratingPercentages[rating] = totalReviews > 0 ? (ratingCounts[rating] / totalReviews) * 100 : 0;
    });

    return { ratingCounts, ratingPercentages, totalReviews };
  };

  // Sort reviews based on selected option
  useEffect(() => {
    const reviewList = reviews.reviews || [];
    let sorted = [...reviewList];

    switch (sortBy) {
      case "Highest Rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "Lowest Rating":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "Most Recent":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Default to most recent
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setSortedReviews(sorted);
  }, [sortBy, reviews.reviews]);

  const { ratingCounts, ratingPercentages, totalReviews } = calculateRatingStats();

  // Calculate average rating
  const calculateAverageRating = () => {
    const reviewList = reviews.reviews || [];
    if (reviewList.length === 0) return 0;

    const totalRating = reviewList.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviewList.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  const sortOptions = [
    "Most Recent",
    "Highest Rating",
    "Lowest Rating",
    "Most Helpful",
  ];

  const handleSort = (option) => {
    setSortBy(option);
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

        <div className="flex flex-col items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarRating key={i} filled={i < Math.floor(averageRating)} />
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
              percentage={ratingPercentages[rating]}
              count={ratingCounts[rating]}
            />
          ))}
        </div>

        <div className="flex-1 flex justify-end">
          {!isLoggedIn ? (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Login to write a review</p>
              <Button
                variant="outline"
                className="border-[#F59A1133] hover:bg-orange-50 hover:border-orange-300 transition-colors"
                onClick={() => {
                  try {
                    const currentPath = window.location.pathname + window.location.search + window.location.hash;
                    dispatch(setLoginRedirectUrl(currentPath));
                  } catch (_) {}
                  router.push('/');
                  dispatch(openLoginPopup({}));
                }}
              >
                Login
              </Button>
            </div>
          ) : !isCheckingReviewEligibility && canWriteReview ? (
            <Button
              variant="outline"
              className="border-[#F59A1133] hover:bg-orange-50 hover:border-orange-300 transition-colors"
              onClick={() => setIsReviewModalOpen(true)}
            >
              Write A Review
            </Button>
          ) : !isCheckingReviewEligibility && !canWriteReview ? (
            <div className="text-center">
              <p className="text-sm text-gray-600">Purchase this product to review</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600">Checking eligibility...</p>
            </div>
          )}
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
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review, index) => (
            <ReviewCard key={review._id || index} review={review} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        productId={productId}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productName={productName}
      />
    </div>
  );
};

export default ProductReviews;
