import Link from "next/link";
import PriceRange from "../../components/PriceRange";

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
  };
};

const SearchRestaurantCard = ({ restaurant }: SearchREstaurantCardProps) => {
  return (
    <div className="flex pb-5 border-b">
      <img src={restaurant.main_image} alt="" className="rounded w-44" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="flex font-light text-reg">
            <p className="mr-4">
              <PriceRange priceRange={restaurant.price_range} />
            </p>
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
