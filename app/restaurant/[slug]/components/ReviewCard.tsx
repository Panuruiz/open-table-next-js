import { Review } from "@prisma/client";
import getRandomHexColor from "../../../../utils/getRandomHexColor";
import getTheInitials from "../../../../utils/getTheInitials";
import {
  ratingAdjectiveRecord,
  starsRecord,
} from "../../../../utils/reviewRatingAverage";

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { first_name, last_name, rating, text } = review;

  return (
    <div className="border-b pb-7 mb-7">
      <div className="flex">
        <div className="flex flex-col items-center w-1/6">
          <div
            className={`flex items-center justify-center w-16 h-16 bg-blue-400 rounded-full`}
          >
            <p className="text-2xl text-white">
              {getTheInitials(first_name, last_name)}
            </p>
          </div>
          <p className="mt-2 text-center">
            {first_name} {last_name}
          </p>
        </div>
        <div className="w-5/6 ml-10">
          <div className="flex items-center">
            <div className="flex mr-5">
              <span className="mr-4">{starsRecord[rating]}</span>
              {ratingAdjectiveRecord[rating]}
            </div>
          </div>
          <div className="mt-5">
            <p className="text-lg italic font-light">"{text}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
