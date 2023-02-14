type RestaurantTitleProps = {
  title: string;
};

const RestaurantTitle = ({ title }: RestaurantTitleProps) => {
  return (
    <div className="pb-6 mt-4 border-b">
      <h3 className="text-6xl font-bold">{title}</h3>
    </div>
  );
};

export default RestaurantTitle;
