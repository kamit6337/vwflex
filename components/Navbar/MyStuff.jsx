"use client";

import Link from "next/link";
import { useState } from "react";

const MyStuff = () => {
  const [toggleMyStuff, setToggleMyStuff] = useState(false);

  return (
    <div
      className="h-full relative w-28 hover:bg-slate-800"
      onMouseLeave={() => setToggleMyStuff(false)}
    >
      <p
        className={`${
          toggleMyStuff && "border-b border-white"
        }   p-3 cursor-pointer text_navbar`}
        onMouseEnter={() => setToggleMyStuff(true)}
      >
        My Stuff
      </p>
      {toggleMyStuff && (
        <div className="w-full absolute  top-full  z-50 bg-slate-800 rounded-b-xl transition-all duration-1000 text-base">
          <Link href={`/watchlist`} onClick={() => setToggleMyStuff(false)}>
            <p className="w-full p-3 cursor-pointer hover:bg-white hover:text-my_bg hover:rounded-b-xl">
              Watchlist
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyStuff;
