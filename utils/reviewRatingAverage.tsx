import { Review } from "@prisma/client";
import { ReactNode } from "react";

export const getReviewRatingAverage = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return 0;
  }

  let sum = 0;

  reviews.forEach((review) => {
    sum += review.rating;
  });

  const average = sum / reviews.length;

  if (average % 1 === 0 || average === 5) {
    return average;
  }

  return Math.floor(average);
};

export const starsRecord: Record<number, ReactNode> = {
  0: <div className="flex mb-2 text-gray-400/25">★★★★★</div>,
  1: (
    <div className="flex mb-2 text-gray-400/25">
      <span className="text-yellow-400">★</span>★★★★
    </div>
  ),
  2: (
    <div className="flex mb-2 text-gray-400/25">
      <span className="text-yellow-400">★★</span>★★★
    </div>
  ),
  3: (
    <div className="flex mb-2 text-gray-400/25">
      <span className="text-yellow-400">★★★</span>★★
    </div>
  ),
  4: (
    <div className="flex mb-2 text-gray-400/25">
      <span className="text-yellow-400">★★★★</span>★
    </div>
  ),
  5: (
    <div className="flex mb-2 text-gray-400/25">
      <span className="text-yellow-400">★★★★★</span>
    </div>
  ),
};

export const ratingAdjectiveRecord: Record<number, string> = {
  0: "Terrible",
  1: "Bad",
  2: "Okay",
  3: "Good",
  4: "Great",
  5: "Awesome",
};
