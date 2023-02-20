import { PrismaClient } from "@prisma/client";
import type { ReactNode } from "react";
import RestaurantHeader from "./components/RestaurantHeader";

type RestaurantLayoutProps = {
  children: ReactNode;
  params: {
    slug: string;
  };
};

const prisma = new PrismaClient();

const RestaurantLayout = async ({
  children,
  params,
}: RestaurantLayoutProps) => {
  const restaurantImage = await prisma.restaurant.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      main_image: true,
    },
  });

  const renderTitle = () => {
    const nameArray = params.slug.split("-");

    nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;

    return nameArray.join(" ");
  };

  return (
    <main>
      <RestaurantHeader
        title={renderTitle()}
        mainImage={restaurantImage?.main_image}
      />
      <div className="flex items-start justify-between w-2/3 m-auto 0 -mt-11">
        {children}
      </div>
    </main>
  );
};

export default RestaurantLayout;
