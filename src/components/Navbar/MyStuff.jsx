"use client";

import { useState } from "react";

const MyStuff = () => {
  const [toggleMyStuff, setToggleMyStuff] = useState(false);

  return (
    <div
      className="h-full relative w-full"
      onMouseLeave={() => setToggleMyStuff(false)}
    >
      <p
        className="p-3 cursor-pointer"
        onMouseEnter={() => setToggleMyStuff(true)}
      >
        My Stuff
      </p>
      {toggleMyStuff && (
        <div className="absolute text-lg top-full w-full z-50 bg-slate-600 rounded-b-xl transition-all delay-1000 ">
          <p className="w-full p-3 cursor-pointer">Watchlist</p>
        </div>
      )}
    </div>
  );
};

export default MyStuff;
