import { PRICE_RANGE } from "@prisma/client";
import Link from "next/link";

type SearchSideBarProps = {
  cuisine: {
    id: number;
    name: string;
  }[];
  location: {
    id: number;
    name: string;
  }[];
  searchParams: {
    city?: string;
    cuisine?: string;
    priceRange?: PRICE_RANGE;
  };
};

const SearchSideBar = ({
  cuisine,
  location,
  searchParams,
}: SearchSideBarProps) => {
  const prices = [
    {
      price_range: PRICE_RANGE.CHEAP,
      label: "$",
      className: "w-full text-center p-2 font-light border rounded-l text-reg",
    },
    {
      price_range: PRICE_RANGE.REGULAR,
      label: "$$",
      className: "w-full text-center p-2 font-light border text-reg",
    },
    {
      price_range: PRICE_RANGE.EXPENSIVE,
      label: "$$$",
      className: "w-full text-center p-2 font-light border rounded-r text-reg",
    },
  ];

  return (
    <div className="w-1/5 mr-2">
      <div className="flex flex-col pb-4 border-b">
        <h3 className="mb-2">Region</h3>
        {location.map((city) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: city.name,
              },
            }}
            className="font-light capitalize text-reg"
            key={city.id}
          >
            {city.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col pb-4 mt-3 border-b">
        <h3 className="mb-2">Cuisine</h3>
        {cuisine.map((style) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: style.name,
              },
            }}
            className="font-light capitalize text-reg"
            key={style.id}
          >
            {style.name}
          </Link>
        ))}
      </div>
      <div className="pb-4 mt-3">
        <h3 className="mb-2">Price</h3>
        <div className="flex">
          {prices.map((price) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  priceRange: price.price_range,
                },
              }}
              key={price.price_range}
              className={price.className}
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
