import Link from "next/link";
import NavBar from "../../components/NavBar";
import Description from "./components/Description";
import ImagesGallery from "./components/ImagesGallery";
import Rating from "./components/Rating";
import ReservationsCard from "./components/ReservationsCard";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantNavBar from "./components/RestaurantNavBar";
import RestaurantTitle from "./components/RestaurantTitle";
import Reviews from "./components/Reviews";

const RestaurantDetails = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <RestaurantHeader />
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNavBar />
            <RestaurantTitle />
            <Rating />
            <Description />
            <ImagesGallery />
            <Reviews />
          </div>
          <ReservationsCard />
        </div>
      </main>
    </main>
  );
};

export default RestaurantDetails;
