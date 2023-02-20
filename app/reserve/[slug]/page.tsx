import NavBar from "../../components/NavBar";
import ReserveForm from "./components/ReserveForm";
import ReserveHeader from "./components/ReserveHeader";

const Reserve = () => {
  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="bg-white max-w-screen-2xl">
        <div className="h-screen border-t">
          <div className="w-3/5 m-auto py-9">
            <ReserveHeader />
            <ReserveForm />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Reserve;
