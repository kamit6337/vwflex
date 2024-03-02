/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Episodes from "./Episodes";
import { useSelector } from "react-redux";
import { fixedState } from "@redux/slice/fixedSlice";
import Recommendations from "./Recommendation";
import Similar from "./Similar";
import TvShowsImages from "./TvShowsImages";
import Reviews from "./Reviews";

const detailSection = "detail";
const recommendationSection = "recommendation";
const similarSection = "similar";
const episodesSection = "episodes";
const imageSection = "images";
const reviews = "reviews";

const Additional = ({
  recommendations,
  similar,
  details,
  images,
  id,
  season,
}) => {
  const [optionSelected, setOptionSelected] = useState(episodesSection);
  const { imageDetail } = useSelector(fixedState);
  const {
    production_companies,
    production_countries,
    spoken_languages,
    revenue,
    budget,
    overview,
    episodes,
    created_by,
  } = details;

  useEffect(() => {
    setOptionSelected(episodesSection);
  }, [id, season]);

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
      <div className="sticky top-14 bottom-0 z-20 w-full text-lg sm:text-base font-medium tracking-wider  flex justify-center pb-2 h-[60px] ">
        <div className="w-max flex items-center gap-6 rounded-2xl sm:rounded-xl px-10 sm:px-4 h-full  border-2 border-slate-600 bg-black">
          <p
            className={`${
              optionSelected === episodesSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer `}
            onClick={() => scrollOptionsToTop(episodesSection)}
          >
            Episodes
          </p>
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

      {/* MARK: OPTIONS SELECTED */}

      {optionSelected === detailSection && (
        <div className="p-16 sm:px-5 pr-0 flex flex-col items-start justify-between gap-12 relative z-10 w-4/5 sm:w-full">
          {overview && (
            <div>
              <p className="text-xl sm:text-base sm:font-semibold border-b-2 border-white/70 w-max font-semibold tracking-wider mb-2 ">
                DESCRIPTION
              </p>
              <p className="tracking-wider leading-6 sm:text-sm">{overview}</p>
            </div>
          )}

          {created_by && created_by.length > 0 && (
            <div>
              <p className="uppercase border-b-2 border-white/70 w-max font-semibold tracking-wider mb-4 ">
                Created By
              </p>
              <div className="flex justify-start gap-4 flex-wrap">
                {created_by.map((by, i) => {
                  const { name, profile_path } = by;

                  const size = imageDetail.backdrop_sizes[0];
                  const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
                  const createPhoto = `${createBaseUrl}${profile_path}`;

                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-20">
                        <img
                          src={createPhoto}
                          alt={name}
                          className="w-full object-cover rounded-lg"
                        />
                      </div>
                      <p key={i} className="sm:text-sm">
                        {by.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <p className="text-xl w-max font-semibold tracking-wider mb-2 sm:text-base sm:font-semibold border-b-2 border-white/70">
              PRODUCTION COMPANIES
            </p>
            <div className="flex justify-start gap-8 sm:gap-4 sm:flex-wrap">
              {production_companies.map((company, i) => {
                const { logo_path, name } = company;

                return (
                  <p key={i} className="sm:text-sm">
                    {name}
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

      {optionSelected === episodesSection && (
        <div className="w-full flex flex-col gap-8 py-20 px-10">
          <Episodes data={episodes} />
        </div>
      )}

      {optionSelected === recommendationSection && <Recommendations id={id} />}

      {optionSelected === similarSection && <Similar id={id} />}

      {optionSelected === imageSection && <TvShowsImages id={id} />}

      {optionSelected === reviews && <Reviews id={id} />}
    </>
  );
};

export default Additional;
