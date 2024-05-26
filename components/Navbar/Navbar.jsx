import Link from "next/link";
import Home from "./Home";
import Categories from "./Categories";
import MyStuff from "./MyStuff";
import Search from "./Search";
import Profile from "./Profile";
import Store from "./Store";
import checkUserLogin from "@api/query/auth/checkUserLogin";
import LoginButton from "@components/LoginButton";

const Navbar = async () => {
  const user = await checkUserLogin();

  return (
    <nav className="w-full h-full flex justify-center items-center ">
      <div className="flex items-center gap-20 sm_lap:gap-10 tablet:gap-2 w-max relative">
        <p className="cursor-pointer text-xl font-semibold tracking-wider text-white">
          <Link href={`/`} prefetch={false}>
            VwFlex
          </Link>
        </p>
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
          {user ? <Profile user={user} /> : <LoginButton sm_width={true} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
