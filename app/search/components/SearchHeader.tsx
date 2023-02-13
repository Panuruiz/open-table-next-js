import Link from "next/link";

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
        <div className="text-left text-lg py-3 m-auto flex justify-center">
          <input
            className="rounded  mr-3 p-2 w-[450px]"
            type="text"
            placeholder="State, city or town"
          />
          <button className="rounded bg-red-600 px-9 py-2 text-white">
            Let's go
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
