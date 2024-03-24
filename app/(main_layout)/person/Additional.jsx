/* eslint-disable @next/next/no-img-element */
"use client";

import HorizontalList from "@components/HorizontalList";
import MoviesHorizontalList from "@components/movies/MoviesHorizontalList";
import TvHorizontalList from "@components/TvHorizontalList";
import { useState } from "react";

const creditsSection = "credits";
const imagesSection = "images";
const MOVIE = "movie";
const TV = "tv";

const Additional = ({ credits, images, fixed }) => {
  const [optionSelected, setOptionSelected] = useState(creditsSection);

  const scrollOptionsToTop = (value) => {
    setOptionSelected(value);

    setTimeout(function () {
      window.scrollTo({
        top: window.innerHeight - 56,
        behavior: "smooth",
      });
    }, 200);
  };

  const moviesKnown_for = {
    data: credits.movies,
  };

  const tvKnown_for = {
    data: credits.tv,
  };

  return (
    <>
      <div className="sticky top-14 bottom-0 z-20 w-full text-lg sm:text-base font-medium tracking-wider  flex justify-center pb-2 h-[60px] ">
        <div className="w-max flex items-center gap-6 rounded-2xl sm:rounded-xl px-10 sm:px-4 h-full  border-2 border-slate-600 bg-black">
          <p
            className={`${
              optionSelected === creditsSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer uppercase`}
            onClick={() => scrollOptionsToTop(creditsSection)}
          >
            Known For
          </p>

          <p
            className={`${
              optionSelected === imagesSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer uppercase`}
            onClick={() => scrollOptionsToTop(imagesSection)}
          >
            images
          </p>
        </div>
      </div>

      {optionSelected === creditsSection && (
        <div>
          {moviesKnown_for.data?.length > 0 && (
            <HorizontalList
              data={moviesKnown_for}
              title={"Movies"}
              zIndex={4}
              type={MOVIE}
            />
          )}

          {tvKnown_for.data?.length > 0 && (
            <HorizontalList
              data={tvKnown_for}
              title={"TV Shows"}
              zIndex={3}
              type={TV}
            />
          )}
        </div>
      )}

      {optionSelected === imagesSection && (
        <div className="flex flex-wrap p-10 ">
          {images.map((image, i) => {
            const { ratio, path } = image;

            const size = fixed.imageDetail.profile_sizes.at(-1);
            const createBaseUrl = `${fixed.imageDetail.secure_base_url}${size}`;
            const createPhoto = `${createBaseUrl}${path}`;

            return (
              <div key={i} className="w-1/5 px-2 py-4">
                <img
                  src={createPhoto}
                  alt="image"
                  className="w-full object-cover rounded-md"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Additional;
