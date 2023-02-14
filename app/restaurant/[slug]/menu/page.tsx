import Link from "next/link";
import NavBar from "../../../components/NavBar";
import MenuList from "../components/MenuList";
import RestaurantHeader from "../components/RestaurantHeader";
import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantLayout from "../layout";

const RestaurantMenu = () => {
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar />
      <MenuList />
    </div>
  );
};

export default RestaurantMenu;
