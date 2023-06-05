import SVGNodeEditor from "./SVGNodeEditor";

function Navigation() {
  return (
    <div className="fixed w-12 h-12 bg-white top-4 left-4 p-1 rounded-lg text-center shadow-md shadow-gray-200 z-10">
      icon
    </div>
  );
}

function Layout() {
  return (
    <div className="flex items-center h-screen w-screen flex-wrap">
      <Navigation />

      <SVGNodeEditor />
    </div>
  );
}

export default Layout;
