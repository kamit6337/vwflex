"use client";

/* eslint-disable @next/next/no-img-element */
import { Icons } from "@assets/icons";
import debounce from "@utils/javascript/debounce";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const DAY = "day";
const WEEK = "week";

const TrendingMovieList = ({
  id,
  title,
  data,
  promise,
  fixed,
  zIndex = 10,
}) => {
  const [index, setIndex] = useState(0);
  const [movieData, setMovieData] = useState(() => {
    return data?.data.filter((movie) => movie.backdrop_path);
  });
  const [numImagePerScrren, setNumImagePerScreen] = useState(4);
  const [leftArrowInLarge, setLeftArrowInLarge] = useState(false);
  const [rightArrowInLarge, setRightArrowInLarge] = useState(false);
  const [movieIndex, setMovieIndex] = useState(null);
  const [selectTime, setSelectTime] = useState(DAY);

  const maxIndex = useMemo(() => {
    if (!movieData) return null;

    let maxIndexGoesTo;
    if (movieData.length % numImagePerScrren === 0) {
      maxIndexGoesTo = -(movieData.length / numImagePerScrren - 1);
    } else {
      const divide = movieData.length / numImagePerScrren;

      maxIndexGoesTo = -Math.floor(divide);
    }

    return maxIndexGoesTo;
  }, [movieData, numImagePerScrren]);

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

  const handleMouseEnter = (i, id) => {
    setMovieIndex(i);
  };

  const handleSelectedTime = async (e) => {
    const { value } = e.target;

    setSelectTime(value);

    let fetchTrendingMovie = await promise(value);

    fetchTrendingMovie = fetchTrendingMovie?.data.filter(
      (movie) => movie.backdrop_path
    );

    setMovieData(fetchTrendingMovie);
  };

  return (
    <section
      className="flex flex-col gap-4 relative pt-5 pb-16"
      style={{ zIndex }}
    >
      {title && (
        <div className="flex justify-between items-center">
          <p className="ml-14 text-xl font-semibold tracking-wider">{title}</p>

          <select
            value={selectTime}
            onChange={handleSelectedTime}
            className="mr-8 -mb-2 bg-inherit text-white border border-white"
          >
            <option value={DAY} className="bg-black text-white">
              Day
            </option>
            <option value={WEEK} className="bg-black text-white">
              Week
            </option>
          </select>
        </div>
      )}

      <div className="relative">
        <div className="ml-10 mr-5">
          <div
            className="flex transition-all duration-500"
            style={{ translate: `${100 * index}%` }}
          >
            {movieData?.length > 0 &&
              movieData.map((movie, i) => {
                const {
                  backdrop_path,
                  genre_ids,
                  id,
                  original_title,
                  poster_path,
                  release_date,
                  title,
                  vote_average,
                } = movie;

                if (!backdrop_path) return;

                const size = fixed.imageDetail.backdrop_sizes[0];

                const createBaseUrl = `${fixed.imageDetail.secure_base_url}${size}`;

                const createPhoto = `${createBaseUrl}${backdrop_path}`;

                return (
                  <div
                    key={i}
                    className={`${
                      movieIndex === i &&
                      "scale-125  transition-all duration-300"
                    } relative grow-0 shrink-0 basis-1/4  px-2`}
                    style={{ zIndex: movieIndex === i ? 999 : -1 }}
                  >
                    <div
                      className="relative rounded-xl"
                      onMouseLeave={() => setMovieIndex(null)}
                    >
                      <Link href={`/movie?id=${id}`}>
                        <div
                          onMouseEnter={() => handleMouseEnter(i, id)}
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
                        <div className="absolute top-full  w-full p-4 transition-all duration-300 bg-my_bg rounded-b-xl">
                          <p>{title}</p>
                          <p>{vote_average}</p>
                          <p>{release_date}</p>
                          <p>{original_title}</p>
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

export default TrendingMovieList;
