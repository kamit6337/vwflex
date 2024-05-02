"use client";

import { Icons } from "@assets/icons";
import { useState } from "react";

const Store = () => {
  const [toggleStore, setToggleStore] = useState(false);

  return (
    <div
      className="h-full w-28 relative hover:bg-slate-800 "
      onMouseLeave={() => setToggleStore(false)}
    >
      <div
        className={`${
          toggleStore && "border-b border-white text-white"
        }  p-3 cursor-pointer tracking-wider text-gray-400 font-semibold  flex items-center gap-2`}
        onMouseEnter={() => setToggleStore(true)}
      >
        <p>Store</p>

        {toggleStore ? (
          <p>
            <Icons.upArrow />
          </p>
        ) : (
          <p>
            <Icons.downArrow />
          </p>
        )}
      </div>

      {toggleStore && (
        <div className="w-full absolute top-full z-50 bg-slate-800 rounded-b-xl transition-all duration-1000 text-base">
          <p className="w-full p-3 cursor-pointer  hover:bg-white hover:text-my_bg">
            All
          </p>
          <p className="w-full p-3 cursor-pointer  hover:bg-white hover:text-my_bg">
            Rent
          </p>
          <p className="w-full p-3 cursor-pointer  hover:bg-white hover:text-my_bg">
            Channels
          </p>
        </div>
      )}
    </div>
  );
};

export default Store;
