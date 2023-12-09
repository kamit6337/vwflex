"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [toggleHome, setToggleHome] = useState(false);
  const [toggleMyStuff, setToggleMyStuff] = useState(false);

  return (
    <nav className="w-full h-full flex justify-between items-center px-36">
      <p>
        <Link href={`/`}>VwFlex</Link>
      </p>
      <div className="w-1/3  flex justify-between h-full">
        <div
          className="h-full w-full relative"
          onMouseLeave={() => setToggleHome(false)}
        >
          <p
            className="p-3 cursor-pointer"
            onMouseEnter={() => setToggleHome((prev) => !prev)}
          >
            Home
          </p>

          {toggleHome && (
            <div className="absolute text-lg top-full w-full z-50 bg-slate-600 rounded-b-xl transition-all delay-1000 ">
              <p className="w-full p-3 cursor-pointer border-b border-black">
                All
              </p>
              <p className="w-full p-3 cursor-pointer border-b border-black">
                <Link
                  href={`/movies`}
                  prefetch={false}
                  onClick={() => setToggleHome(false)}
                >
                  Movies
                </Link>
              </p>
              <p className="w-full p-3 cursor-pointer border-b border-black">
                <Link href={`/tv`} onClick={() => setToggleHome(false)}>
                  TV Shows
                </Link>
              </p>
              <p className="w-full p-3 cursor-pointer">Peoples</p>
            </div>
          )}
        </div>
        <p className="h-full p-3 w-full">Categories</p>
        <div
          className="h-full relative w-full"
          onMouseLeave={() => setToggleMyStuff(false)}
        >
          <p
            className="p-3 cursor-pointer"
            onMouseEnter={() => setToggleMyStuff((prev) => !prev)}
          >
            My Stuff
          </p>
          {toggleMyStuff && (
            <div className="absolute text-lg top-full w-full z-50 bg-slate-600 rounded-b-xl transition-all delay-1000 ">
              <p className="w-full p-3 cursor-pointer">Watchlist</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex">
        <p className="h-full p-3 ">Search</p>
        <p className="h-full p-3 ">Profile</p>
      </div>
    </nav>
  );
};

export default Navbar;
