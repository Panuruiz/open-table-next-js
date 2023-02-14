import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE_RANGE, PrismaClient } from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  price_range: PRICE_RANGE;
  location: Location;
  slug: string;
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      price_range: true,
      location: true,
      slug: true,
    },
  });

  return restaurants;
};

export default async function Home() {
  const fetchedRestaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <main>
        <div className="flex flex-wrap py-3 mt-10 px-36">
          {fetchedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </main>
    </main>
  );
}
