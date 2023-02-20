import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import ReserveForm from "./components/ReserveForm";
import ReserveHeader from "./components/ReserveHeader";

type ReserveProps = {
  params: {
    slug: string;
  };
  searchParams: {
    date: string;
    time: string;
    partySize: string;
  };
};

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      main_image: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const Reserve = async ({ params, searchParams }: ReserveProps) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="bg-white max-w-screen-2xl">
        <div className="h-screen border-t">
          <div className="w-3/5 m-auto py-9">
            <ReserveHeader
              image={restaurant.main_image}
              name={restaurant.name}
              date={searchParams.date}
              partySize={searchParams.partySize}
            />
            <ReserveForm
              slug={params.slug}
              date={searchParams.date}
              partySize={searchParams.partySize}
            />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Reserve;
