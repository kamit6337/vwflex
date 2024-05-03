"use client";

import { Icons } from "@assets/icons";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [toggleHome, setToggleHome] = useState(false);

  return (
    <div
      className="h-full relative hover:bg-slate-800 "
      onMouseLeave={() => setToggleHome(false)}
    >
      <div
        className={`${
          toggleHome && "border-b border-white text-white"
        } text_navbar`}
        onMouseEnter={() => setToggleHome(true)}
      >
        <p>Home</p>

        {toggleHome ? (
          <p>
            <Icons.upArrow />
          </p>
        ) : (
          <p>
            <Icons.downArrow />
          </p>
        )}
      </div>

      {toggleHome && (
        <div className="w-full absolute top-full z-50 bg-slate-800 rounded-b-xl transition-all duration-1000 text-base">
          <Link href={`/`} onClick={() => setToggleHome(false)}>
            <p className="text_navbar_option">All</p>
          </Link>
          <Link href={`/movies`} onClick={() => setToggleHome(false)}>
            <p
              className="text_navbar_option"
              onClick={() => setToggleHome(false)}
            >
              Movies
            </p>
          </Link>
          <Link href={`/tvShows`} onClick={() => setToggleHome(false)}>
            <p className="text_navbar_option">TV Shows</p>
          </Link>
          <Link href={`/peoples`} onClick={() => setToggleHome(false)}>
            <p className="text_navbar_option hover:rounded-b-xl ">Peoples</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
