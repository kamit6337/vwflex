"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const [toggleHome, setToggleHome] = useState(false);
  const [toggleMyStuff, setToggleMyStuff] = useState(false);
  const router = useRouter();

  return (
    <nav className="w-full h-full flex justify-between items-center px-36">
      <p onClick={() => router.push("/")}>VwFlex</p>
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
              <Link href={`/movies`} onClick={() => setToggleHome(false)}>
                <p
                  className="w-full p-3 cursor-pointer border-b border-black"
                  onClick={() => setToggleHome(false)}
                >
                  Movies
                </p>
              </Link>
              <Link href={`/tv`} onClick={() => setToggleHome(false)}>
                <p className="w-full p-3 cursor-pointer border-b border-black">
                  TV Shows
                </p>
              </Link>
              <Link href={`/peoples`} onClick={() => setToggleHome(false)}>
                <p className="w-full p-3 cursor-pointer">Peoples</p>
              </Link>
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
