"use client";

import fetchMovieDetail from "@api/query/movie/fetchMovieDetail";
/* eslint-disable @next/next/no-img-element */
import { Icons } from "@assets/icons";
import debounce from "@utils/javascript/debounce";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const MoviesHorizontalList = ({
  id,
  title,
  data,
  fixed,
  promise,
  zIndex,
  instant,
}) => {
  const [totalPages, setTotalpages] = useState(data?.totalPages);
  const [index, setIndex] = useState(0);
  const [movieData, setMovieData] = useState(() => {
    return data?.data.filter((movie) => movie.backdrop_path);
  });
  const [numImagePerScrren, setNumImagePerScreen] = useState(4);
  const [leftArrowInLarge, setLeftArrowInLarge] = useState(false);
  const [rightArrowInLarge, setRightArrowInLarge] = useState(false);
  const [movieIndex, setMovieIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitialQuery, setIsLoadingInitialQuery] = useState(false);
  const [startFetching, setStartFetching] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px 0px 0px",
  });

  useEffect(() => {
    if (movieData && movieData.length > 0) return;

    if (inView) {
      setIsLoadingInitialQuery(true);

      const fetchInitialQuery = async () => {
        const query = await promise();
        const filter = query.data.filter((movie) => movie.backdrop_path);
        setMovieData(filter);
        setTotalpages(query.totalPages);
        setIsLoadingInitialQuery(false);
      };

      fetchInitialQuery();
    }
  }, [inView, movieData, promise]);

  useEffect(() => {
    const fetchQuery = async () => {
      const currentPage = page + 1;

      if (currentPage <= totalPages) {
        setIsLoading(true);

        console.log("page", currentPage);
        const query = await promise(currentPage);

        const filter = query.data.filter((movie) => movie.backdrop_path);

        setMovieData((prev) => [...prev, ...filter]);
        setPage((prev) => prev + 1);
        console.log("query", query);
      }

      setStartFetching(false);
      setIsLoading(false);
    };

    if (startFetching && !isLoading) {
      fetchQuery();
    }
  }, [startFetching, isLoading, page, promise, totalPages]);

  const maxIndex = useMemo(() => {
    if (!movieData) return null;

    let maxIndexGoesTo;
    if (movieData.length % 4 === 0) {
      maxIndexGoesTo = -(movieData.length / 4 - 1);
    } else {
      const divide = movieData.length / 4;

      maxIndexGoesTo = -Math.floor(divide);
    }

    return maxIndexGoesTo;
  }, [movieData]);

  useEffect(() => {
    if (index >= 0) {
      setLeftArrowInLarge(false);
    }

    if (index === maxIndex) {
      setRightArrowInLarge(false);
    }
  }, [index, maxIndex]);

  const scrollingNumber = (num) => {
    if (num % numImagePerScrren === 0) {
      return num / numImagePerScrren;
    } else {
      return Math.floor(num / numImagePerScrren) + 1;
    }
  };

  const checkScrollable = (number) => {
    // IF LIST VIEW IS 2 PAGE BEFORE COMPLETION THEN START FETCHING
    if (number === -(scrollingNumber(movieData.length) - 2)) {
      console.log(number);
      setStartFetching(true);
    }

    // RIGHT ARRAOW
    if (number < -(scrollingNumber(movieData.length) - 1)) {
      return 0;
    }

    // LEFT ARROW
    if (number > 0) {
      return -Math.floor(scrollingNumber(movieData.length) - 1);
    }
    return number;
  };

  const scrollLeft = () => {
    setIndex((prev) => prev + 1);
  };

  const scrollRight = () => {
    // if you want  to fetch 2 page before, use maxIndexGoesTo + 2

    console.log(index, maxIndex);

    if (index - 1 === maxIndex + 1) {
      setStartFetching(true);
    }

    setIndex((prev) => prev - 1);
  };

  const debouncedScrollLeft = debounce(scrollLeft, 600);
  const debouncedScrollRight = debounce(scrollRight, 1000);

  if (isLoadingInitialQuery) {
    return (
      <div className="w-full h-40 flex justify-center items-center">
        <div className="loading" />
      </div>
    );
  }

  const handleMouseEnter = (i, id) => {
    setMovieIndex(i);
  };

  return (
    <section
      className="flex flex-col gap-4 relative pt-5 pb-16"
      style={{ zIndex }}
      ref={instant ? null : ref}
    >
      <div className="flex justify-between items-center">
        <p className="ml-14 text-xl font-semibold tracking-wider">{title}</p>
        <p className=" mr-8 -mb-2">
          <Link href={`/movies/${id}`}>See All</Link>
        </p>
      </div>

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

                const createPhoto = `${fixed.imageUrl}${backdrop_path}`;

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
                      <Link href={`/movie/${id}`}>
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
            {isLoading && (
              <div className="grow-0 shrink-0 basis-96 flex justify-center items-center">
                <div className="loading" />
              </div>
            )}
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

export default MoviesHorizontalList;
