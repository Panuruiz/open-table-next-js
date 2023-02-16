import { ReactNode } from "react";
import ReviewCard from "./ReviewCard";

type ReviewsProps = {
  children: ReactNode;
  numberOfReviews: number;
};

const Reviews = ({ children, numberOfReviews }: ReviewsProps) => {
  return (
    <div>
      <h3 className="pb-5 mt-10 text-3xl font-bold mb-7 borber-b">
        What {numberOfReviews} {numberOfReviews === 1 ? "person" : "people"}{" "}
        {numberOfReviews === 1 ? "is" : "are"} saying
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default Reviews;
