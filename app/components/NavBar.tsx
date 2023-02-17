"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signOut } = useAuth();

  return (
    <nav className="flex justify-between p-2 bg-white">
      <h1>
        <Link href="/" className="text-2xl font-bold text-gray-700">
          OpenTable
        </Link>
      </h1>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button
                onClick={signOut}
                className="p-1 px-4 mr-3 text-white transition-colors ease-linear bg-blue-400 border rounded hover:bg-red-600"
              >
                Sign out
              </button>
            ) : (
              <>
                <AuthModal isSignIn />
                <AuthModal />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
