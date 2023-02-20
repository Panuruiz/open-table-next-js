const Reserve = () => {
  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="bg-white max-w-screen-2xl">
        <div className="h-screen border-t">
          <div className="w-3/5 m-auto py-9">
            <div className="w-full h-32 mt-4 mb-4 bg-gray-400 rounded">
              <div className="w-32 h-32 bg-gray-600 animate-pulse" />
            </div>
            <div className="w-full bg-gray-400 rounded h-75">
              <div className="w-full h-10 mt-4 bg-gray-500 rounded animate-pulse" />
              <div className="w-full h-10 mt-4 bg-gray-500 rounded animate-pulse" />
              <div className="w-full h-10 mt-4 bg-gray-500 rounded animate-pulse" />
              <div className="w-full h-10 mt-4 bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </main>
  );
};

export default Reserve;
