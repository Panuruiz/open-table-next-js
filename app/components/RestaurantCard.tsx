import Link from "next/link";
import { RestaurantCardType } from "../page";
import PriceRange from "./PriceRange";
import {
  getReviewRatingAverage,
  starsRecord,
} from "../../utils/reviewRatingAverage";

interface RestaurantCardProps {
  restaurant: RestaurantCardType;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const { name, main_image, cuisine, price_range, location, slug, reviews } =
    restaurant;

  return (
    <div className="w-64 m-3 overflow-hidden border rounded cursor-pointer h-72">
      <Link href={`/restaurant/${slug}`}>
        <img src={main_image} alt={name} className="w-full h-36" />
        <div className="pt-1 pb-1 pl-2 pr-2">
          <h3 className="mb-2 text-2xl font-bold">{name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">
              {starsRecord[getReviewRatingAverage(reviews)]}
            </div>
            <p className="ml-2">
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex font-light capitalize text-reg">
            <p className="mr-3 ">{cuisine.name}</p>
            <div className="mr-3">
              <PriceRange priceRange={price_range} />
            </div>
            <p>{location.name}</p>
          </div>
          <p className="mt-1 text-sm font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
