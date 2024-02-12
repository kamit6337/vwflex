"use client";

import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [toggleHome, setToggleHome] = useState(false);

  return (
    <div
      className="h-full w-full relative"
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
          className="absolute text-lg top-full w-full z-50 bg-slate-600 rounded-b-xl transition-all delay-1000 "
          // onMouseLeave={() => setToggleHome(false)}
        >
          <p className="w-full p-3 cursor-pointer border-b border-black">All</p>
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
  );
};

export default Home;
