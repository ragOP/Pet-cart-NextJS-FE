"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { createReview } from "@/app/apis/createReview";
import { toast } from "sonner";

const StarRating = ({ rating, onRatingChange, interactive = true }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => interactive && onRatingChange(i + 1)}
          className={`transition-colors ${
            interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
          }`}
          disabled={!interactive}
        >
          <Star
            className={`w-6 h-6 ${
              i < rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewModal = ({ isOpen, onClose, productName = "Product", productId }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));

    if (errors.rating) {
      setErrors(prev => ({
        ...prev,
        rating: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rating) {
      newErrors.rating = "Please select a rating";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Review comment is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const reviewData = {
        productId,
        rating: formData.rating,
        review: formData.comment.trim(),
      };

      const response = await createReview(reviewData);

      if (response.error) {
        setSubmitError("Failed to submit review. Please try again.");
        return;
      }

      if (response.response?.success) {
        toast.success(response.response?.message);
        handleClose();
      } else {
        setSubmitError(response.response?.message || "Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitError("An error occurred while submitting your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      rating: 0,
      comment: "",
    });
    setErrors({});
    setSubmitError("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="p-0 w-full max-w-md">
        <DialogHeader className="px-6 py-4 bg-[#F59A111A]">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Write a Review
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            Share your experience with {productName}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Your Rating *
            </label>
            <div className="flex items-center gap-3">
              <StarRating
                rating={formData.rating}
                onRatingChange={handleRatingChange}
                interactive={!isSubmitting}
              />
              <span className="text-sm text-gray-500">
                {formData.rating > 0 && `${formData.rating} out of 5 stars`}
              </span>
            </div>
            {errors.rating && (
              <p className="text-xs text-red-600">{errors.rating}</p>
            )}
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium text-gray-700">
              Your Review *
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              placeholder="Tell us about your experience with this product..."
              value={formData.comment}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-[#6A68680D] border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.comment && (
              <p className="text-xs text-red-600">{errors.comment}</p>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-600">{submitError}</p>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              By submitting this review, you agree to our review guidelines.
              Your review will be published publicly and may be used for marketing purposes.
            </p>
          </div>
        </form>

        <DialogFooter className="px-6 pb-6 gap-3">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#F59A11] hover:bg-[#E58A00] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </div>
            ) : (
              "Submit Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
