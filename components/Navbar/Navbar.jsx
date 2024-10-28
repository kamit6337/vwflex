import Link from "next/link";
import Home from "./Home";
import Categories from "./Categories";
import MyStuff from "./MyStuff";
import Search from "./Search";
import Profile from "./Profile";
import Store from "./Store";
import LoginButton from "@components/LoginButton";
import Image from "next/image";
import CustomImages from "@assets/images";

const Navbar = async () => {
  const user = null;

  return (
    <nav className="w-full h-full flex justify-center items-center ">
      <div className="flex items-center gap-20 sm_lap:gap-10 tablet:gap-2 w-max relative">
        <div className="w-32">
          <Link href={`/`} prefetch={false}>
            <Image src={CustomImages.logo} alt="Logo" className="w-full" />
          </Link>
        </div>
        <div className="self-center flex justify-between h-full whitespace-nowrap ">
          {/* MARK: HOME COMPONENT */}
          <Home />
          <Store />
          <Categories />

          {/* MARK: MY STUFF COMPONENT */}
          <MyStuff />
        </div>
        <div className="flex h-full items-center gap-4">
          <Search />
          {user ? (
            <Profile name={user.name} email={user.email} />
          ) : (
            <LoginButton sm_width={true} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
