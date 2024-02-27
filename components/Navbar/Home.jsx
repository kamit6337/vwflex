"use client";

import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [toggleHome, setToggleHome] = useState(false);

  return (
    <div
      className="h-full w-24 relative"
      onMouseLeave={() => setToggleHome(false)}
    >
      <p
        className="p-3 cursor-pointer"
        onMouseEnter={() => setToggleHome(true)}
      >
        Home
      </p>

      {toggleHome && (
        <div
          className="w-full absolute top-full z-50 bg-my_bg rounded-b-xl transition-all duration-1000 text-base"
          // onMouseLeave={() => setToggleHome(false)}
        >
          <p className="w-full p-3 cursor-pointer  hover:bg-white hover:text-my_bg">
            All
          </p>
          <Link href={`/movies`} onClick={() => setToggleHome(false)}>
            <p
              className="w-full p-3 cursor-pointer  hover:bg-white hover:text-my_bg"
              onClick={() => setToggleHome(false)}
            >
              Movies
            </p>
          </Link>
          <Link href={`/tv`} onClick={() => setToggleHome(false)}>
            <p className="w-full p-3 cursor-pointer  hover:bg-white hover:text-my_bg">
              TV Shows
            </p>
          </Link>
          <Link href={`/peoples`} onClick={() => setToggleHome(false)}>
            <p className="w-full p-3 cursor-pointer hover:bg-white hover:text-my_bg hover:rounded-b-xl ">
              Peoples
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
