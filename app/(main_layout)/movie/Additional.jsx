"use client";
import HorizontalList from "@components/HorizontalList";
import { useEffect, useMemo, useState } from "react";
import recommendationSchema, {
  getMovieRecommendationsDataQuery,
} from "@graphql/movie/recommendationSchema";
import {
  detailSection,
  imageSection,
  movieDetailOptions,
  recommendationSection,
  reviews,
  similarSection,
} from "@constants/detailOptions";
import SimilarMovies from "./SimilarMovies";
import MovieImages from "./MovieImages";
import Reviews from "./Reviews";
import { MOVIE } from "@constants/mediaType";
import MediaDetailInfo from "@components/MediaDetailInfo";

const Additional = ({ recommendations, details, id, fixed }) => {
  const [optionSelected, setOptionSelected] = useState(null);

  useEffect(() => {
    if (id) {
      setOptionSelected(recommendationSection);
    }
  }, [id]);

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
          {movieDetailOptions.map((option, i) => {
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

      {/* optionSelected */}
      {optionSelected === detailSection && (
        <MediaDetailInfo details={details} />
      )}

      {optionSelected === recommendationSection && (
        <HorizontalList
          id={id}
          schema={recommendationSchema}
          dataQuery={getMovieRecommendationsDataQuery}
          fixed={fixed}
          initialData={recommendations}
          media={MOVIE}
          variables={{ id, page: 1 }}
        />
      )}

      {optionSelected === similarSection && (
        <SimilarMovies id={id} fixed={fixed} />
      )}

      {optionSelected === imageSection && <MovieImages id={id} fixed={fixed} />}

      {optionSelected === reviews && <Reviews id={id} fixed={fixed} />}
    </>
  );
};

export default Additional;
