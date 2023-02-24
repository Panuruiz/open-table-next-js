import { Item, PrismaClient } from "@prisma/client";
import MenuList from "../components/MenuList";
import RestaurantNavBar from "../components/RestaurantNavBar";

type MenuProps = {
  params: {
    slug: string;
  };
};

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant.items;
};

const RestaurantMenu = async ({ params }: MenuProps) => {
  const items = await fetchRestaurantMenu(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      {items ? (
        <MenuList items={items} />
      ) : (
        "This Restaurant doesn't have a Menu yet"
      )}
    </div>
  );
};

export default RestaurantMenu;
