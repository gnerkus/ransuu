

function Layout() {
  return (
    <div className="flex items-center h-screen w-screen flex-wrap">
      <div className="fixed w-12 h-12 bg-white top-4 left-4">header</div>
      <div className="bg-red-500 w-full sm:w-full xl:w-2/3 h-2/3 sm:h-2/3 xl:h-full"></div>
      <div className="bg-blue-500 w-full sm:w-full xl:w-1/3 h-1/3 sm:h-1/3 xl:h-full"></div>
    </div>
  );
}

export default Layout;
