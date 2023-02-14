import type { ReactNode } from "react";
import RestaurantHeader from "./components/RestaurantHeader";

type RestaurantLayoutProps = {
  children: ReactNode;
};

const RestaurantLayout = ({ children }: RestaurantLayoutProps) => {
  return (
    <main>
      <RestaurantHeader />
      <div className="flex items-start justify-between w-2/3 m-auto 0 -mt-11">
        {children}
      </div>
    </main>
  );
};

export default RestaurantLayout;
