import { PrismaClient, Review } from "@prisma/client";
import Description from "./components/Description";
import ImagesGallery from "./components/ImagesGallery";
import Rating from "./components/Rating";
import ReservationsCard from "./components/ReservationsCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import RestaurantTitle from "./components/RestaurantTitle";
import ReviewCard from "./components/ReviewCard";
import Reviews from "./components/Reviews";
import { notFound } from "next/navigation";

type RestaurantPageProps = {
  params: {
    slug: string;
  };
};

type RestaurantPageType = {
  id: number;
  name: string;
  description: string;
  images: string[];
  slug: string;
  reviews: Review[];
  open_time: string;
  close_time: string;
};

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (
  slug: string
): Promise<RestaurantPageType> => {
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
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const RestaurantDetails = async ({ params }: RestaurantPageProps) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <RestaurantTitle title={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <ImagesGallery images={restaurant.images} />
        {restaurant.reviews.length && (
          <Reviews numberOfReviews={restaurant.reviews.length}>
            {restaurant.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Reviews>
        )}
      </div>
      <ReservationsCard
        openTime={restaurant.open_time}
        closeTime={restaurant.close_time}
        slug={restaurant.slug}
      />
    </>
  );
};

export default RestaurantDetails;
