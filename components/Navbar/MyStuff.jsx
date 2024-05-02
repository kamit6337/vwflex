"use client";

import { Icons } from "@assets/icons";
import Link from "next/link";
import { useState } from "react";

const MyStuff = () => {
  const [toggleMyStuff, setToggleMyStuff] = useState(false);

  return (
    <div
      className="h-full relative w-28 hover:bg-slate-800"
      onMouseLeave={() => setToggleMyStuff(false)}
    >
      <div
        className={`${
          toggleMyStuff && "border-b border-white text-white"
        }   p-3 cursor-pointer tracking-wider text-gray-400 font-semibold flex items-center gap-2`}
        onMouseEnter={() => setToggleMyStuff(true)}
      >
        <p>My Stuff</p>
        {toggleMyStuff ? (
          <p>
            <Icons.upArrow />
          </p>
        ) : (
          <p>
            <Icons.downArrow />
          </p>
        )}
      </div>
      {toggleMyStuff && (
        <div className="w-full absolute  top-full  z-50 bg-slate-800 rounded-b-xl transition-all duration-1000 text-base">
          <p className="w-full p-3 cursor-pointer hover:bg-white hover:text-my_bg">
            All
          </p>
          <Link href={`/watchlist`} onClick={() => setToggleMyStuff(false)}>
            <p className="w-full p-3 cursor-pointer hover:bg-white hover:text-my_bg">
              Watchlist
            </p>
          </Link>
          <p className="w-full p-3 cursor-pointer hover:bg-white hover:text-my_bg hover:rounded-b-xl">
            Rentals
          </p>
        </div>
      )}
    </div>
  );
};

export default MyStuff;
