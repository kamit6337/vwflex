"use client";
import HorizontalList from "@components/HorizontalList";
import {
  creditsSection,
  imageSection,
  personDetailOptions,
} from "@constants/detailOptions";
import { MOVIE, TV } from "@constants/mediaType";
import { useRef, useState } from "react";
import PersonImages from "./PersonImages";
import { getPersonTvCreditsDataQuery } from "@graphql/peoples/personTvSchema";
import personMovieSchema, {
  getPersonMovieCreditsDataQuery,
} from "@graphql/peoples/personMovieSchema";
import personTvSchema from "@graphql/peoples/personTvSchema";

const Additional = ({ movies, tv, fixed, id }) => {
  const [optionSelected, setOptionSelected] = useState(creditsSection);
  const ref = useRef(null);

  console.log("movies", movies);
  console.log("tv", tv);

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

  return (
    <div ref={ref}>
      <div className="sticky top-14 bottom-0 z-20 w-full font-medium tracking-wider flex justify-center pb-2 h-[60px]">
        <div className="w-max flex items-center gap-6 tablet:gap-3   rounded-2xl  px-10 tablet:px-5 h-full  border-2 border-slate-600 bg-black mobile:text-xs">
          {personDetailOptions.map((option, i) => {
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

      {optionSelected === creditsSection && (
        <div>
          {movies?.length > 0 && (
            <HorizontalList
              id={id}
              schema={personMovieSchema}
              dataQuery={getPersonMovieCreditsDataQuery}
              fixed={fixed}
              initialData={movies}
              media={MOVIE}
              zIndex={3}
              name={"Movies"}
              pagination={false}
            />
          )}

          {tv?.length > 0 && (
            <HorizontalList
              id={id}
              schema={personTvSchema}
              dataQuery={getPersonTvCreditsDataQuery}
              fixed={fixed}
              initialData={tv}
              media={TV}
              zIndex={2}
              name={"TV Shows"}
              pagination={false}
            />
          )}
        </div>
      )}

      {optionSelected === imageSection && (
        <PersonImages fixed={fixed} id={id} />
      )}
    </div>
  );
};

export default Additional;
