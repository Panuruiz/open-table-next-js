import NavBar from "../../../components/NavBar";

const RestaurantHeader = () => {
  return (
    <div className="h-96 overflow-hidden">
      <NavBar />
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h2 className="text-7xl text-white captitalize text-shadow text-center">
          Milestones Grill (Toronto)
        </h2>
      </div>
    </div>
  );
};

export default RestaurantHeader;
