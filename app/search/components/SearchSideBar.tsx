type SearchSideBarProps = {
  cuisines: {
    id: number;
    name: string;
  }[];
  locations: {
    id: number;
    name: string;
  }[];
};

const SearchSideBar = ({ cuisines, locations }: SearchSideBarProps) => {
  return (
    <div className="w-1/5 mr-2">
      <div className="pb-4 border-b">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <p className="font-light capitalize text-reg" key={location.id}>
            {location.name}
          </p>
        ))}
      </div>
      <div className="pb-4 mt-3 border-b">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <p className="font-light capitalize text-reg" key={cuisine.id}>
            {cuisine.name}
          </p>
        ))}
      </div>
      <div className="pb-4 mt-3">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <button className="w-full p-2 font-light border rounded-l text-reg">
            $
          </button>
          <button className="w-full p-2 font-light border-t border-b border-r text-reg">
            $$
          </button>
          <button className="w-full p-2 font-light border-t border-b border-r rounded-r text-reg">
            $$$
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
