import { Item } from "@prisma/client";
import MenuItem from "./MenuItem";

type MenuListProps = {
  items: Item[];
};

const MenuList = ({ items }: MenuListProps) => {
  return (
    <main className="mt-5 bg-white">
      <div>
        <div className="pb-1 mt-4 mb-1">
          <h1 className="text-4xl font-bold">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {items.length ? (
            items.map((item) => <MenuItem key={item.id} item={item} />)
          ) : (
            <p className="text-lg font-bold">
              This Restaurnt doesn't have a Menu
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MenuList;
