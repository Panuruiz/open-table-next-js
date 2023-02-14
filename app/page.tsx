import { Inter } from "@next/font/google";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-wrap py-3 mt-10 px-36">
          <RestaurantCard />
        </div>
      </main>
    </>
  );
}

// FMyB8G0U8ccTDjcO
