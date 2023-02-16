import { Review } from "@prisma/client";
import { getReviewRatingAverage } from "../../utils/reviewRatingAverage";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";

type StarsProps = {
  reviews?: Review[];
  rating?: number;
};

const getStars = (rating: number) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const difference = parseFloat((rating - i).toFixed(1));

    if (difference >= 1) {
      stars.push(fullStar);
    } else if (difference < 1 && difference > 0) {
      if (difference <= 0.2) {
        stars.push(emptyStar);
      } else if (difference > 0.2 && difference <= 0.7) {
        stars.push(halfStar);
      } else {
        stars.push(fullStar);
      }
    } else {
      stars.push(emptyStar);
    }
  }

  return stars.map((star, index) => {
    return (
      <Image
        alt="a star image"
        className="w-4 h-4 mr-1"
        key={index}
        src={star}
      />
    );
  });
};

const Stars = ({ rating, reviews }: StarsProps) => {
  if (!reviews?.length && !rating) {
    return <div className="flex items-center">{getStars(0)}</div>;
  }
  const reviewRating =
    getReviewRatingAverage(reviews, { oneDecimal: true }) || rating || 0;

  return <div className="flex items-center">{getStars(reviewRating)}</div>;
};

export default Stars;
