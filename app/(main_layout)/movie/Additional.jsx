"use client";

import HorizontalList from "@components/HorizontalList";
import priceInMillions from "@utils/javascript/priceInMillions";
import { useEffect, useState } from "react";
import MovieImages from "./MovieImages";
import SimilarMovies from "./SimilarMovies";
import Reviews from "./Reviews";

const detailSection = "detail";
const recommendationSection = "recommendation";
const similarSection = "similar";
const MOVIE = "movie";
const imageSection = "images";
const reviews = "reviews";

const Additional = ({ recommendations, details, id }) => {
  const [optionSelected, setOptionSelected] = useState(null);

  const {
    production_companies,
    production_countries,
    spoken_languages,
    revenue,
    budget,
    description,
    overview,
  } = details;

  useEffect(() => {
    if (id) {
      setOptionSelected(recommendationSection);
    }
  }, [id]);

  useEffect(() => {
    if (!recommendations || recommendations.data.length === 0) {
      setOptionSelected(similarSection);
    }
  }, [recommendations]);

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
      <div className="sticky top-14 bottom-0 z-20 w-full font-medium tracking-wider flex justify-center pb-2 h-[60px] tablet:text-sm">
        <div className="w-max flex items-center gap-6 rounded-2xl  px-10 h-full  border-2 border-slate-600 bg-black">
          {recommendations && recommendations.data.length > 0 && (
            <p
              className={`${
                optionSelected === recommendationSection &&
                "border-b-2 border-white"
              } hover:border-b-2 hover:border-white cursor-pointer `}
              onClick={() => scrollOptionsToTop(recommendationSection)}
            >
              Recommendations
            </p>
          )}
          <p
            className={`${
              optionSelected === similarSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer `}
            onClick={() => scrollOptionsToTop(similarSection)}
          >
            Similar
          </p>
          <p
            className={`${
              optionSelected === detailSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => scrollOptionsToTop(detailSection)}
          >
            Details
          </p>
          <p
            className={`${
              optionSelected === imageSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => scrollOptionsToTop(imageSection)}
          >
            Images
          </p>
          <p
            className={`${
              optionSelected === reviews && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => scrollOptionsToTop(reviews)}
          >
            Reviews
          </p>
        </div>
      </div>

      {/* optionSelected */}

      {optionSelected === detailSection && (
        <div className="p-16 sm:px-5 pr-0 flex flex-col items-start justify-between gap-12 relative z-10 w-4/5 sm:w-full">
          {overview && (
            <div>
              <p className="text-xl sm:text-base sm:font-semibold border-b-2 border-white/70 w-max font-semibold tracking-wider mb-2 uppercase">
                overview
              </p>
              <p className="tracking-wider leading-6 sm:text-sm">{overview}</p>
            </div>
          )}
          {description && (
            <div>
              <p className="text-xl sm:text-base sm:font-semibold border-b-2 border-white/70 w-max font-semibold tracking-wider mb-2 ">
                DESCRIPTION
              </p>
              <p className="tracking-wider leading-6 sm:text-sm">
                {description}
              </p>
            </div>
          )}

          {budget > 0 && (
            <div>
              <p className="text-xl w-max font-semibold tracking-wider mb-2 sm:text-base sm:font-semibold border-b-2 border-white/70">
                BUDGET
              </p>
              <p className="sm:text-sm">{priceInMillions(budget)}</p>
            </div>
          )}

          {revenue > 0 && (
            <div>
              <p className="text-xl w-max font-semibold tracking-wider mb-2 sm:text-base sm:font-semibold border-b-2 border-white/70">
                REVENUE
              </p>
              <p className="sm:text-sm">{priceInMillions(revenue)}</p>
            </div>
          )}

          <div>
            <p className="text-xl w-max font-semibold tracking-wider mb-2 sm:text-base sm:font-semibold border-b-2 border-white/70">
              PRODUCTION COMPANIES
            </p>
            <div className="flex justify-start gap-8 sm:gap-4 sm:flex-wrap">
              {production_companies.map((company, i) => {
                return (
                  <p key={i} className="sm:text-sm">
                    {company.name}
                  </p>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xl w-max font-semibold tracking-wider mb-2 sm:text-base sm:font-semibold border-b-2 border-white/70 sm:gap-4 sm:flex-wrap">
              PRODUCTION COUNTRIES
            </p>
            <div className="flex justify-start gap-8">
              {production_countries.map((country, i) => {
                return (
                  <p key={i} className="sm:text-sm ">
                    {country.name}
                  </p>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xl w-max font-semibold tracking-wider mb-2 sm:text-base sm:font-semibold border-b-2 border-white/70">
              AUDIO LANGUAGE
            </p>
            <div className="flex justify-start gap-6">
              {spoken_languages.map((language, i) => {
                return (
                  <p key={i} className="sm:text-sm">
                    {language.english_name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {optionSelected === recommendationSection && (
        <HorizontalList id={id} data={recommendations} type={MOVIE} />
      )}

      {optionSelected === similarSection && <SimilarMovies id={id} />}

      {optionSelected === imageSection && <MovieImages id={id} />}

      {optionSelected === reviews && <Reviews id={id} />}
    </>
  );
};

export default Additional;
