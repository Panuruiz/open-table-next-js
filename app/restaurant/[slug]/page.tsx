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
import RestaurantLayout from "./layout";

const RestaurantDetails = () => {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar />
        <RestaurantTitle />
        <Rating />
        <Description />
        <ImagesGallery />
        <Reviews />
      </div>
      <ReservationsCard />
    </>
  );
};

export default RestaurantDetails;
