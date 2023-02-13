import Link from "next/link";
import SearchBar from "../../components/SearchBar";

const SearchHeader = () => {
  return (
    <>
      <nav className="bg-white p-2 flex justify-between">
        <Link href="/" className="font-bold text-gray-700 text-2xl">
          OpenTable
        </Link>
        <div>
          <div className="flex">
            <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
              Sign in
            </button>
            <button className="border p-1 px-4 rounded">Sign up</button>
          </div>
        </div>
      </nav>
      <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
        <SearchBar />
      </div>
    </>
  );
};

export default SearchHeader;
