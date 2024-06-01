"use client";

import { Icons } from "@assets/icons";
import { useState } from "react";

const Store = () => {
  const [toggleStore, setToggleStore] = useState(false);

  return (
    <div
      className="h-full relative hover:bg-slate-800 mobile:hidden"
      onMouseLeave={() => setToggleStore(false)}
    >
      <div
        className={`${
          toggleStore && "border-b border-white text-white"
        }  text_navbar`}
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
          <p className="text_navbar_option">All</p>
          <p className="text_navbar_option">Rent</p>
          <p className="text_navbar_option hover:rounded-b-xl ">Channels</p>
        </div>
      )}
    </div>
  );
};

export default Store;
