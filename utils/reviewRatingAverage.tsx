import { Review } from "@prisma/client";
import fullStar from "../public/icons/full-star.png";
import halfStar from "../public/icons/half-star.png";
import emptyStar from "../public/icons/empty-star.png";
import Image from "next/image";

export const getReviewRatingAverage = (
  reviews?: Review[],
  options?: { oneDecimal?: boolean }
) => {
  if (!reviews?.length) {
    return 0;
  }

  let sum = 0;

  reviews.forEach((review) => {
    sum += review.rating;
  });

  const average = sum / reviews.length;

  if (average % 1 === 0 || average === 5) {
    return Number(average);
  }

  if (options?.oneDecimal) {
    return Number(average.toFixed(1));
  }

  return Number(Math.floor(average));
};

export const ratingAdjectiveRecord: Record<number, string> = {
  0: "Terrible",
  1: "Bad",
  2: "Okay",
  3: "Good",
  4: "Great",
  5: "Awesome",
};
