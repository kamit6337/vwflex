"use client";

import HorizontalList from "@components/HorizontalList";
import {
  creditsSection,
  imageSection,
  personDetailOptions,
} from "@constants/detailOptions";
import { MOVIE } from "@constants/mediaType";
import { useRef, useState } from "react";
import PersonImages from "./PersonImages";

const Additional = ({ credits, fixed, id }) => {
  const [optionSelected, setOptionSelected] = useState(creditsSection);
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
          {credits?.movies?.length > 0 && (
            <HorizontalList
              id={id}
              fixed={fixed}
              initialData={credits.movies}
              media={MOVIE}
              zIndex={50}
              name={"Movies"}
            />
          )}

          {credits?.tv?.length > 0 && (
            <HorizontalList
              id={id}
              fixed={fixed}
              initialData={credits.tv}
              media={MOVIE}
              zIndex={48}
              name={"TV Shows"}
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
