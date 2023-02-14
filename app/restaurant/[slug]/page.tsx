import { PrismaClient } from "@prisma/client";
import Description from "./components/Description";
import ImagesGallery from "./components/ImagesGallery";
import Rating from "./components/Rating";
import ReservationsCard from "./components/ReservationsCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import RestaurantTitle from "./components/RestaurantTitle";
import Reviews from "./components/Reviews";

interface RestaurantInterface {
  id: number;
  name: string;
  description: string;
  images: string[];
  slug: string;
}

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (
  slug: string
): Promise<RestaurantInterface> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      slug: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
};

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  console.log(restaurant);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <RestaurantTitle title={restaurant.name} />
        <Rating />
        <Description description={restaurant.description} />
        <ImagesGallery images={restaurant.images} />
        <Reviews />
      </div>
      <ReservationsCard />
    </>
  );
};

export default RestaurantDetails;
