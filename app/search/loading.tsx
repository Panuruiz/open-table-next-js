import React from "react";

const Loading = () => {
  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="bg-white max-w-screen-2xl">
        <div className="flex justify-center w-full h-5">
          <div className="w-10 h-full"></div>
        </div>
        <div className="flex items-start justify-between w-2/3 py-4 m-auto">
          <div className="w-1/5 mr-2">
            <div className="flex flex-col pb-4 border-b">
              <div className="w-full h-5 mb-6 bg-gray-500 rounded animate-pulse" />
              <div className="w-full h-5 mb-3 bg-gray-400 rounded animate-pulse" />
              <div className="w-full h-5 mb-3 bg-gray-400 rounded animate-pulse" />
              <div className="w-full h-5 mb-3 bg-gray-400 rounded animate-pulse" />
            </div>
            <div className="flex flex-col pb-4 border-b">
              <div className="w-full h-5 mb-6 bg-gray-500 rounded animate-pulse" />
              <div className="w-full h-5 mb-3 bg-gray-400 rounded animate-pulse" />
              <div className="w-full h-5 mb-3 bg-gray-400 rounded animate-pulse" />
              <div className="w-full h-5 mb-3 bg-gray-400 rounded animate-pulse" />
            </div>
            <div className="flex flex-col pb-4 border-b">
              <div className="w-full h-5 mb-6 bg-gray-500 rounded animate-pulse" />
              <div className="w-full h-5 mb-3 bg-gray-400 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-4/5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="mt-4 border-b pb-6 animate-pulse bg-slate-200 w-[400px] h-16 rounded"
              ></div>
            ))}
          </div>
        </div>
      </main>
    </main>
  );
};

export default Loading;
