type RestaurantHeaderProps = {
  title: string;
};

const RestaurantHeader = ({ title }: RestaurantHeaderProps) => {
  return (
    <div className="overflow-hidden h-96">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h2 className="text-center text-white capitalize text-7xl text-shadow">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default RestaurantHeader;
