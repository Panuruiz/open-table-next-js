import { PRICE_RANGE, PrismaClient } from "@prisma/client";
import SearchHeader from "./components/SearchHeader";
import SearchRestaurantCard from "./components/SearchRestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

type SearchParams = {
  city?: string;
  cuisine?: string;
  priceRange?: PRICE_RANGE;
};

type SearchProps = {
  searchParams: SearchParams;
};

type WhereType = {
  location?: {
    name?: {
      equals?: string;
    };
  };
  cuisine?: {
    name?: {
      equals?: string;
    };
  };
  price_range?: {
    equals?: PRICE_RANGE;
  };
};

const prisma = new PrismaClient();

const fetchRestaurantsByLocation = (searchParams: SearchParams) => {
  const where: WhereType = {};

  if (searchParams.city) {
    where.location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
  }

  if (searchParams.cuisine) {
    where.cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
  }

  if (searchParams.priceRange) {
    where.price_range = {
      equals: searchParams.priceRange,
    };
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    price_range: true,
    location: true,
    slug: true,
    reviews: true,
  };

  return prisma.restaurant.findMany({
    where,
    select: select,
  });
};

const fetchLocations = () => {
  return prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

const fetchCuisine = () => {
  return prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

const Search = async ({ searchParams }: SearchProps) => {
  const restaurants = await fetchRestaurantsByLocation(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisine();

  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="bg-white max-w-screen-2xl">
        <SearchHeader />
        <div className="flex items-start justify-between w-2/3 py-4 m-auto">
          <SearchSideBar
            cuisine={cuisines}
            location={locations}
            searchParams={searchParams}
          />
          <div className="w-4/5">
            {restaurants.length ? (
              restaurants.map((restaurant) => (
                <SearchRestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))
            ) : (
              <p className="content-center font-semibold">
                Sorry, we found no restaurants in this city.
              </p>
            )}
          </div>
        </div>
      </main>
    </main>
  );
};

export default Search;
