"use client";

import { Icons } from "@assets/icons";
import Link from "next/link";
import { useState } from "react";

const MyStuff = () => {
  const [toggleMyStuff, setToggleMyStuff] = useState(false);

  return (
    <div
      className="h-full relative hover:bg-slate-800"
      onMouseLeave={() => setToggleMyStuff(false)}
    >
      <div
        className={`${
          toggleMyStuff && "border-b border-white text-white"
        }  text_navbar`}
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
          <p className="text_navbar_option">All</p>
          <Link href={`/watchlist`} onClick={() => setToggleMyStuff(false)}>
            <p className="text_navbar_option">Watchlist</p>
          </Link>
          <p className="text_navbar_option hover:rounded-b-xl">Rentals</p>
        </div>
      )}
    </div>
  );
};

export default MyStuff;
