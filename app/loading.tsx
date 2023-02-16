import Header from "./components/Header";

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div
            key={item}
            className="w-64 m-3 overflow-hidden border rounded animate-puls bg-slate-200 h-72 cursos-pointer"
          >
            ""
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loading;
