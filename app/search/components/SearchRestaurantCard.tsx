import { Review } from "@prisma/client";
import Link from "next/link";
import PriceRange from "../../components/PriceRange";
import {
  getReviewRatingAverage,
  ratingAdjectiveRecord,
} from "../../../utils/reviewRatingAverage";
import Stars from "../../components/Stars";

type SearchREstaurantCardProps = {
  restaurant: {
    name: string;
    main_image: string;
    cuisine: {
      name: string;
    };
    price_range: string;
    location: {
      name: string;
    };
    slug: string;
    reviews: Review[];
  };
};

const SearchRestaurantCard = ({ restaurant }: SearchREstaurantCardProps) => {
  return (
    <div className="flex pb-5 border-b">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img
          src={restaurant.main_image}
          alt=""
          className="object-cover object-center transition duration-300 ease-in-out rounded hover:scale-110 w-44 h-44"
        />
      </Link>
      <div className="pt-2 pl-4">
        <h2 className="mb-4 text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 text-sm">
            {!restaurant.reviews.length
              ? "Not reviewed yet"
              : ratingAdjectiveRecord[
                  getReviewRatingAverage(restaurant.reviews)
                ]}
          </p>
        </div>
        <div className="mb-9">
          <div className="flex font-light text-reg">
            <div className="mr-4">
              <PriceRange priceRange={restaurant.price_range} />
            </div>
            <p className="mr-4 italic">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchRestaurantCard;
