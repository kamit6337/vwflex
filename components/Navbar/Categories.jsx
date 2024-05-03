"use client";

import { Icons } from "@assets/icons";
import { useState } from "react";

const Categories = () => {
  const [toggleCategories, setToggleCategories] = useState(false);

  return (
    <div onMouseLeave={() => setToggleCategories(false)}>
      <div
        className={`${
          toggleCategories && "border-b border-white text-white"
        }  text_navbar`}
        onMouseEnter={() => setToggleCategories(true)}
      >
        <p>Categories</p>

        {toggleCategories ? (
          <p>
            <Icons.upArrow />
          </p>
        ) : (
          <p>
            <Icons.downArrow />
          </p>
        )}
      </div>

      {toggleCategories && (
        <div className="absolute left-0 z-50 top-full w-full bg-slate-800 rounded p-10 flex gap-20">
          <div className="flex-1 space-y-8 ">
            <p className="cursor-pointer text-lg tablet:text-base font-semibold">
              Genres
            </p>
            <div className="flex justify-between gap-8 text-gray-400 tablet:text-sm">
              <div className="space-y-5 ">
                <p className="cursor-pointer">Action</p>
                <p className="cursor-pointer">Animation</p>
                <p className="cursor-pointer">Documentary</p>
                <p className="cursor-pointer">Drama</p>
                <p className="cursor-pointer">Comedy</p>
                <p className="cursor-pointer">Fantasy</p>
              </div>
              <div className="space-y-5">
                <p className="cursor-pointer">Horror</p>
                <p className="cursor-pointer">International</p>
                <p className="cursor-pointer">Kids</p>
                <p className="cursor-pointer">Music</p>
                <p className="cursor-pointer">Mystery and Thriller</p>
                <p className="cursor-pointer">Romance</p>
              </div>
            </div>
          </div>
          <div className="w-1/3 space-y-8">
            <p className="cursor-pointer text-lg tablet:text-base font-semibold">
              Features Collection
            </p>
            <div className="flex justify-between gap-8 text-gray-400 tablet:text-sm">
              <div className="space-y-8">
                <p className="cursor-pointer">Hindi</p>
                <p className="cursor-pointer">English</p>
                <p className="cursor-pointer">Gujrati</p>
                <p className="cursor-pointer">Bengali</p>
              </div>
              <div className="space-y-8">
                <p className="cursor-pointer">Telugu</p>
                <p className="cursor-pointer">Tamil</p>
                <p className="cursor-pointer">Kannada</p>
                <p className="cursor-pointer">Malyallam</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
