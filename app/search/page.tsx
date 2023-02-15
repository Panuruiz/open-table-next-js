import { PRICE_RANGE, PrismaClient } from "@prisma/client";
import SearchHeader from "./components/SearchHeader";
import SearchRestaurantCard from "./components/SearchRestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

type SearchProps = {
  searchParams: {
    city?: string;
    cuisine?: string;
    price?: PRICE_RANGE;
  };
};

const prisma = new PrismaClient();

const fetchRestaurantsByLocation = (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    price_range: true,
    location: true,
    slug: true,
  };

  if (!city) return prisma.restaurant.findMany({ select: select });

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
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
  const restaurants = await fetchRestaurantsByLocation(searchParams.city);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisine();

  console.log(searchParams.city);
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
