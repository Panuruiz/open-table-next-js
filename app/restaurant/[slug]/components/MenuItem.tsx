import { Item } from "@prisma/client";

type MenuItemProps = {
  item: Item;
};

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <div className=" border rounded p-3 w-[49%] mb-3">
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="mt-1 text-sm font-light">{item.description}</p>
      <p className="mt-7">{item.price}</p>
    </div>
  );
};

export default MenuItem;
