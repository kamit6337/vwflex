"use client";
import { useEffect, useState } from "react";
import {
  detailSection,
  episodesSection,
  imageSection,
  recommendationSection,
  reviews,
  similarSection,
  tvShowDetailOptions,
} from "@constants/detailOptions";
import MediaDetailInfo from "@components/MediaDetailInfo";
import Episodes from "./Episodes";
import Recommendations from "./Recommendation";
import Similar from "./Similar";
import TvShowsImages from "./TvShowsImages";
import Reviews from "./Reviews";

const Additional = ({ details, id, season, fixed, episodes }) => {
  const [optionSelected, setOptionSelected] = useState(episodesSection);

  useEffect(() => {
    setOptionSelected(episodesSection);
  }, [id, season]);

  const scrollOptionsToTop = (value) => {
    setOptionSelected(value);

    setTimeout(function () {
      window.scrollTo({
        top: window.innerHeight - 56,
        behavior: "smooth",
      });
    }, 200);
  };

  return (
    <>
      <div className="sticky top-14 bottom-0 z-20 w-full font-medium tracking-wider flex justify-center pb-2 h-[60px]">
        <div className="w-max flex items-center gap-6 tablet:gap-3   rounded-2xl  px-10 tablet:px-5 h-full  border-2 border-slate-600 bg-black mobile:text-xs">
          {tvShowDetailOptions.map((option, i) => {
            return (
              <p
                key={i}
                className={`${
                  option === optionSelected && "border-b-2 border-white"
                } hover:border-b-2 hover:border-white cursor-pointer capitalize`}
                onClick={() => scrollOptionsToTop(option)}
              >
                {option}
              </p>
            );
          })}
        </div>
      </div>

      {/* MARK: OPTIONS SELECTED */}

      {optionSelected === detailSection && (
        <MediaDetailInfo details={details} />
      )}

      {optionSelected === episodesSection && (
        <div className="w-full flex flex-col gap-8 py-20 px-3 sm:px-5 lg:px-10 ">
          <Episodes episodes={episodes} fixed={fixed} />
        </div>
      )}

      {optionSelected === recommendationSection && (
        <Recommendations id={id} fixed={fixed} />
      )}

      {optionSelected === similarSection && <Similar id={id} fixed={fixed} />}

      {optionSelected === imageSection && (
        <TvShowsImages id={id} fixed={fixed} />
      )}

      {optionSelected === reviews && <Reviews id={id} fixed={fixed} />}
    </>
  );
};

export default Additional;
