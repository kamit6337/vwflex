import Link from "next/link";
import Home from "./Home";
import Categories from "./Categories";
import MyStuff from "./MyStuff";

const Navbar = () => {
  return (
    <nav className="w-full h-full flex justify-center items-center gap-20">
      <p className="cursor-pointer">
        <Link href={`/`} prefetch={false}>
          VwFlex
        </Link>
      </p>
      <div className="self-center flex justify-between h-full whitespace-nowrap">
        {/* MARK: HOME COMPONENT */}

        <Home />

        {/* MARK: CATEGORY COMPONENT */}

        <Categories />

        {/* MARK: MY STUFF COMPONENT */}
        <MyStuff />
      </div>
      <div className="flex h-full">
        <p className="h-full p-3 ">Search</p>
        <p className="h-full p-3 ">Profile</p>
      </div>
    </nav>
  );
};

export default Navbar;
