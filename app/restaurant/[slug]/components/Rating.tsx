import { Review } from "@prisma/client";
import {
  getReviewRatingAverage,
  starsRecord,
} from "../../../../utils/reviewRatingAverage";

type RatingProps = {
  reviews: Review[];
};

const Rating = ({ reviews }: RatingProps) => {
  return (
    <div className="flex items-center pt-4 text-reg">
      <div className="flex items-center">
        <div className="flex">
          {starsRecord[Number(getReviewRatingAverage(reviews))]}
          <p className="ml-3 text-reg">
            {getReviewRatingAverage(reviews, { oneDecimal: true })}
          </p>
          <p className="ml-4 ">
            {reviews.length || 0} Review{reviews.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rating;
