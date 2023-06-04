function Layout() {
  return (
    <div className="flex items-center h-screen w-screen flex-wrap">
      <div className="fixed w-12 h-12 bg-white top-4 left-4 p-1 rounded-lg text-center shadow-md shadow-gray-200 z-10">
        icon
      </div>

      <div className="relative bg-gray-100 w-full h-full">
        <div className="absolute bottom-0 lg:top-0 right-0 flex flex-col md:flex-row lg:flex-col z-10 gap-4 justify-between p-4 w-full lg:w-1/3 h-1/3 lg:h-full">
          <div className="bg-white rounded-xl shadow-md shadow-gray-200 w-full md:w-1/2 lg:w-full h-full lg:h-1/3"></div>
          <div className="bg-white rounded-xl shadow-md shadow-gray-200 w-full md:w-1/2 lg:w-full h-full lg:h-2/3 hidden md:block"></div>
        </div>

        <div className="absolute w-12 h-2/3 lg:h-full top-0 left-4 flex flex-col z-10 justify-center">
          <div className="bg-white h-48 rounded-lg shadow-md shadow-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
