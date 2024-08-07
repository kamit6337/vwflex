"use client";
import { Icons } from "@assets/icons";
import debounce from "@utils/javascript/debounce";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import { useQuery } from "@tanstack/react-query";

const MOVIE = "movie";
const TV = "tv";
const DAY = "day";
const WEEK = "week";

const HorizontalList = ({
  id,
  title = null,
  data,
  type,
  trending = false,
  promise = null,
  zIndex = 10,
  instant,
}) => {
  const [totalPages, setTotalpages] = useState(data?.totalPages);
  const [index, setIndex] = useState(0);
  const [mediaData, setMediaData] = useState(() => {
    return data?.data.filter((media) => media.backdrop_path);
  });
  const [numImagePerScreen, setNumImagePerScreen] = useState(0);
  const [leftArrowInLarge, setLeftArrowInLarge] = useState(false);
  const [rightArrowInLarge, setRightArrowInLarge] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [startFetching, setStartFetching] = useState(false);
  const [selectTime, setSelectTime] = useState(DAY);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px 0px 0px",
  });

  const { data: query } = useQuery({
    queryKey: [title, id],
    queryFn: () => promise(),
    staleTime: Infinity,
    enabled: !!promise && !instant && inView,
  });

  useEffect(() => {
    if (data?.data?.length > 0) {
      setMediaData(data?.data.filter((media) => media.backdrop_path));
      setTotalpages(data?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setNumImagePerScreen(2);
      } else if (window.innerWidth < 900) {
        setNumImagePerScreen(3);
      } else {
        setNumImagePerScreen(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (query) {
      const filter = query.data.filter((media) => media.backdrop_path);
      setMediaData(filter);
      setTotalpages(query.totalPages);
    }
  }, [query]);

  useEffect(() => {
    const fetchQuery = async () => {
      const currentPage = page + 1;

      if (currentPage <= totalPages) {
        setIsLoading(true);

        try {
          const query = await promise(currentPage);
          const filter = query.data.filter((media) => media.backdrop_path);
          setMediaData((prev) => [...prev, ...filter]);
          setPage((prev) => prev + 1);
        } catch (error) {
          console.error(
            "error occured in finding next page of Movies or TV Shows",
            error?.message
          );
        } finally {
          setStartFetching(false);
          setIsLoading(false);
        }
      }
    };

    if (startFetching && !isLoading) {
      fetchQuery();
    }
  }, [startFetching, isLoading, page, promise, totalPages]);

  const maxIndex = useMemo(() => {
    if (!mediaData) return null;

    let maxIndexGoesTo;
    if (mediaData.length % numImagePerScreen === 0) {
      maxIndexGoesTo = -(mediaData.length / numImagePerScreen - 1);
    } else {
      const divide = mediaData.length / numImagePerScreen;
      maxIndexGoesTo = -Math.floor(divide);
    }

    return maxIndexGoesTo;
  }, [mediaData, numImagePerScreen]);

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
    // if you want  to fetch 2 page before, use maxIndexGoesTo + 2
    if (index - 1 === maxIndex + 1) {
      if (promise) {
        setStartFetching(true);
      }
    }
    setIndex((prev) => prev - 1);
  };

  const debouncedScrollLeft = debounce(scrollLeft, 600);
  const debouncedScrollRight = debounce(scrollRight, 1000);

  const handleMouseEnter = (i, id) => {
    setMediaIndex(i);
  };

  const resetMediaIndex = () => {
    setMediaIndex(null);
  };

  const handleSelectedTime = async (e) => {
    const { value } = e.target;
    setSelectTime(value);
    let fetchTrendingMovie = await promise(value);
    fetchTrendingMovie = fetchTrendingMovie?.data.filter(
      (media) => media.backdrop_path
    );
    setMediaData(fetchTrendingMovie);
  };

  if (!mediaData || mediaData?.length === 0) {
    return <div className="h-1" ref={instant ? null : ref} />;
  }

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

          {trending && (
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
          )}
        </div>
      )}

      <div className="relative">
        <div className="ml-10 tablet:ml-4 mr-5">
          <div
            className="flex transition-all duration-500"
            style={{ translate: `${100 * index}%` }}
          >
            {mediaData?.length > 0 &&
              mediaData.map((media, i) => {
                if (type === MOVIE) {
                  return (
                    <MovieCard
                      key={i}
                      i={i}
                      movie={media}
                      mediaIndex={mediaIndex}
                      resetMediaIndex={resetMediaIndex}
                      handleMouseEnter={handleMouseEnter}
                      perScreen={numImagePerScreen}
                    />
                  );
                }

                if (type === TV) {
                  return (
                    <TvCard
                      key={i}
                      i={i}
                      tv={media}
                      mediaIndex={mediaIndex}
                      resetMediaIndex={resetMediaIndex}
                      handleMouseEnter={handleMouseEnter}
                      perScreen={numImagePerScreen}
                    />
                  );
                }
                return;
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

      <div className="ml-14 w-max h-10 tablet:h-8 ">
        {index <= -2 && (
          <p className="back_to_start" onClick={() => setIndex(0)}>
            Back to Start
          </p>
        )}
      </div>
    </section>
  );
};

export default HorizontalList;
