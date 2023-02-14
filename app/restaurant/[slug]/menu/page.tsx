import Link from "next/link";
import NavBar from "../../../components/NavBar";
import MenuList from "../components/MenuList";
import RestaurantHeader from "../components/RestaurantHeader";
import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantLayout from "../layout";

type MenuProps = {
  slug: string;
};

const RestaurantMenu = ({ slug }: MenuProps) => {
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={slug} />
      <MenuList />
    </div>
  );
};

export default RestaurantMenu;
