"use client";
/* eslint-disable @next/next/no-img-element */
import { Icons } from "@assets/icons";
import { fixedState } from "@redux/slice/fixedSlice";
import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import OneNumberAfterDecimal from "@utils/javascript/OneNumberAfterDecimal";
import debounce from "@utils/javascript/debounce";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const TvHorizontalList = ({ title, data, zIndex = 10 }) => {
  const [index, setIndex] = useState(0);
  const [numImagePerScrren, setNumImagePerScreen] = useState(5);
  const [leftArrowInLarge, setLeftArrowInLarge] = useState(false);
  const [rightArrowInLarge, setRightArrowInLarge] = useState(false);
  const [movieIndex, setMovieIndex] = useState(null);
  const { imageDetail } = useSelector(fixedState);

  const maxIndex = useMemo(() => {
    if (!data) return null;

    let maxIndexGoesTo;
    if (data.length % numImagePerScrren === 0) {
      maxIndexGoesTo = -(data.length / numImagePerScrren - 1);
    } else {
      const divide = data.length / numImagePerScrren;

      maxIndexGoesTo = -Math.floor(divide);
    }
    return maxIndexGoesTo;
  }, [data, numImagePerScrren]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setNumImagePerScreen(3);
      } else if (window.innerWidth < 900) {
        setNumImagePerScreen(4);
      } else {
        setNumImagePerScreen(5);
      }
    };

    // Initial call to handleResize
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (index >= 0) {
      setLeftArrowInLarge(false);
    }

    if (index === maxIndex) {
      setRightArrowInLarge(false);
    }
  }, [index, maxIndex]);

  const scrollLeft = () => {
    setIndex((prev) => prev + 1);
  };

  const scrollRight = () => {
    setIndex((prev) => prev - 1);
  };

  const debouncedScrollLeft = debounce(scrollLeft, 600);
  const debouncedScrollRight = debounce(scrollRight, 1000);

  const handleMouseEnter = (i) => {
    setMovieIndex(i);
  };

  return (
    <section
      className="flex flex-col gap-4 relative pt-5 pb-16"
      style={{ zIndex }}
    >
      {title && (
        <div className="flex justify-between items-center">
          <p className="ml-14 text-xl font-semibold tracking-wider tablet:ml-10 tablet:text-base">
            {title}
          </p>
        </div>
      )}

      <div className="relative">
        <div className="ml-10 tablet:ml-4 mr-5">
          <div
            className={`flex transition-all duration-500`}
            style={{ translate: `${100 * index}%` }}
          >
            {data?.length > 0 &&
              data.map((tv, i) => {
                const {
                  tvId,
                  season,
                  original_name,
                  poster_path,
                  name,
                  vote_average,
                  air_date,
                } = tv;

                if (!poster_path) return;

                const size = imageDetail.poster_sizes[3];
                const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
                const createPhoto = `${createBaseUrl}${poster_path}`;

                return (
                  <div
                    key={i}
                    className={`${
                      movieIndex === i &&
                      "scale-110  transition-all duration-300"
                    } relative grow-0 shrink-0 px-2`}
                    style={{
                      zIndex: movieIndex === i ? 999 : -1,
                      flexBasis: `${100 / numImagePerScrren}%`,
                    }}
                  >
                    <div
                      className="relative rounded-xl"
                      onMouseLeave={() => setMovieIndex(null)}
                    >
                      <Link href={`/tv?id=${tvId}&season=${season}`}>
                        <div
                          onMouseEnter={() => handleMouseEnter(i)}
                          className="cursor-pointer"
                        >
                          <img
                            src={createPhoto}
                            alt={title}
                            className={`${
                              movieIndex === i ? "rounded-t-xl" : "rounded-xl"
                            } w-full object-cover `}
                          />
                        </div>
                      </Link>

                      {movieIndex === i && (
                        <div className="absolute top-full  w-full p-4 transition-all duration-300 bg-my_hover rounded-b-xl">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <p className="sm_lap:text-sm">{original_name}</p>
                              <p className="text-xs sm_lap:text-[10px]-">
                                {name}
                              </p>
                            </div>
                            {vote_average ? (
                              <p className="border text-sm rounded-full p-2">
                                {OneNumberAfterDecimal(vote_average)}
                              </p>
                            ) : (
                              <p className="text-[10px] text-gray-300 ">
                                Not Rated
                              </p>
                            )}
                          </div>
                          <p className="text-sm mt-2 sm_lap:text-[10px]">
                            First Air : {IndianTypeDate(air_date)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {index < 0 && (
          <div
            className="absolute z-10 top-0 left-0 h-full w-10  cursor-pointer flex justify-center items-center"
            onClick={() => debouncedScrollLeft()}
            onMouseEnter={() => setLeftArrowInLarge(true)}
            onMouseLeave={() => setLeftArrowInLarge(false)}
          >
            <Icons.leftArrow
              className={`${
                leftArrowInLarge ? "text-4xl" : "text-xl"
              } text-white transition-all duration-500  `}
            />
          </div>
        )}

        {maxIndex === index || (
          <div
            className="absolute z-10 top-0 right-0 h-full w-10  cursor-pointer flex justify-center items-center"
            onClick={() => debouncedScrollRight()}
            onMouseEnter={() => setRightArrowInLarge(true)}
            onMouseLeave={() => setRightArrowInLarge(false)}
          >
            <Icons.rightArrow
              className={`${
                rightArrowInLarge ? "text-4xl" : "text-xl"
              } text-white  transition-all duration-500 `}
            />
          </div>
        )}
      </div>

      <div className="ml-14 w-max h-10 ">
        {index <= -2 && (
          <p
            className="h-full rounded-3xl text-xs border border-white px-3 py-2 cursor-pointer flex justify-center items-center"
            onClick={() => setIndex(0)}
          >
            Back to Start
          </p>
        )}
      </div>
    </section>
  );
};

export default TvHorizontalList;
