/* eslint-disable @next/next/no-img-element */
"use client";

import HorizontalList from "@components/HorizontalList";
import { fixedState } from "@redux/slice/fixedSlice";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const creditsSection = "credits";
const imagesSection = "images";
const MOVIE = "movie";
const TV = "tv";

const Additional = ({ credits, images }) => {
  const [optionSelected, setOptionSelected] = useState(creditsSection);
  const { imageDetail } = useSelector(fixedState);
  const ref = useRef(null);

  const scrollOptionsToTop = (value) => {
    setOptionSelected(value);

    setTimeout(function () {
      const boundingRect = ref.current.getBoundingClientRect();
      const topOffset = boundingRect.top + window.scrollY - 56;

      window.scrollTo({
        top: topOffset,
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
    <div ref={ref}>
      <div className="sticky top-14 z-20 w-full  font-medium tracking-wider flex justify-center pb-2 h-[60px] sm_lap:text-sm">
        <div className="w-max flex items-center gap-6 rounded-2xl px-10 h-full  border-2 border-slate-600 bg-black">
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
              zIndex={14}
              type={MOVIE}
            />
          )}

          {tvKnown_for.data?.length > 0 && (
            <HorizontalList
              data={tvKnown_for}
              title={"TV Shows"}
              zIndex={13}
              type={TV}
            />
          )}
        </div>
      )}

      {optionSelected === imagesSection && (
        <div className="flex flex-wrap p-10 tablet:p-2 ">
          {images.map((image, i) => {
            const { ratio, path } = image;

            const size = imageDetail.profile_sizes.at(-1);
            const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
            const createPhoto = `${createBaseUrl}${path}`;

            return (
              <div
                key={i}
                className="w-1/5 sm_lap:w-1/4 tablet:w-1/3 px-2 py-4"
              >
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
    </div>
  );
};

export default Additional;
