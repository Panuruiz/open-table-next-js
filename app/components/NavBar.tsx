import Link from "next/link";
import AuthModal from "./AuthModal";

const NavBar = () => {
  return (
    <nav className="flex justify-between p-2 bg-white">
      <h1>
        <Link href="/" className="text-2xl font-bold text-gray-700">
          OpenTable
        </Link>
      </h1>
      <div>
        <div className="flex">
          <AuthModal isSignIn />
          <AuthModal />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
