import Link from "next/link";
import Home from "./Home";
import Categories from "./Categories";
import MyStuff from "./MyStuff";

const Navbar = () => {
  return (
    <nav className="w-full h-full flex justify-between items-center px-36">
      <p className="cursor-pointer">
        <Link href={`/`}>VwFlex</Link>
      </p>
      <div className="w-1/3 flex justify-between h-full">
        {/* MARK: HOME COMPONENT */}

        <Home />

        {/* MARK: CATEGORY COMPONENT */}

        <Categories />

        {/* MARK: MY STUFF COMPONENT */}
        <MyStuff />
      </div>
      <div className="flex">
        <p className="h-full p-3 ">Search</p>
        <p className="h-full p-3 ">Profile</p>
      </div>
    </nav>
  );
};

export default Navbar;
