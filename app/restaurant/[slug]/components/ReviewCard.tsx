import { Review } from "@prisma/client";
import { ratingAdjectiveRecord } from "../../../../utils/reviewRatingAverage";
import Stars from "../../../components/Stars";

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { first_name, last_name, rating, text } = review;

  const getUserColor = () => {
    const colors = [
      "bg-blue-400",
      "bg-red-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-gray-400",
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor;
  };

  return (
    <div className="border-b pb-7 mb-7">
      <div className="flex">
        <div className="flex flex-col items-center w-1/6">
          <div
            className={`flex items-center justify-center w-16 h-16 ${getUserColor()} rounded-full`}
          >
            <p className="text-2xl text-white">
              {first_name[0].toUpperCase()} {last_name[0].toUpperCase()}
            </p>
          </div>
          <p className="mt-2 text-center">
            {first_name} {last_name}
          </p>
        </div>
        <div className="w-5/6 ml-10">
          <div className="flex items-center">
            <div className="flex mr-5">
              <Stars rating={rating} />
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
