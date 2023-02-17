"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";

const NavBar = () => {
  const { data } = useContext(AuthenticationContext);
  return (
    <nav className="flex justify-between p-2 bg-white">
      <h1>
        <Link href="/" className="text-2xl font-bold text-gray-700">
          OpenTable
        </Link>
      </h1>
      <div>
        <div className="flex">
          {data ? (
            <button className="p-1 px-4 mr-3 border rounded">Logout</button>
          ) : (
            <>
              <AuthModal isSignIn />
              <AuthModal />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
