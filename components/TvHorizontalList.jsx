"use client";
import { Icons } from "@assets/icons";
import debounce from "@utils/javascript/debounce";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import { useLazyQuery } from "@apollo/client";
import TvCard from "./TvCard";
import { DAY, MOVIE, TV, WEEK } from "@constants/mediaType";
import WatchlistTvCard from "./WatchlistTvCard";

const TvHorizontalList = ({
  id,
  schema,
  dataQuery,
  name = null,
  initialData = null,
  media,
  trending = false,
  zIndex = 10,
  fixed,
  pagination = false,
}) => {
  const [index, setIndex] = useState(0);
  const [mediaData, setMediaData] = useState(() => {
    if (!initialData) {
      return [];
    }
    return initialData.filter((media) => media.poster_path);
  });
  const [leftArrowInLarge, setLeftArrowInLarge] = useState(false);
  const [rightArrowInLarge, setRightArrowInLarge] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectTime, setSelectTime] = useState(DAY);

  // const [fetchNext, { loading, error, data }] = useLazyQuery(schema);

  const { ref: findalDivRef, inView: finalDivInView } = useInView({
    rootMargin: "0px 0px 0px 200px",
  });

  useEffect(() => {
    if (initialData?.length > 0) {
      setMediaData(initialData.filter((media) => media.poster_path));
    }
  }, [id, initialData]);

  // useEffect(() => {
  //   if (data && data[dataQuery]?.length > 0) {
  //     const filter = data[dataQuery].filter((media) => !!media.backdrop_path);
  //     setMediaData((prev) => [...prev, ...filter]);
  //     setPage(page + 1);
  //   }
  // }, [data, dataQuery]);

  // useEffect(() => {
  //   if (!loading)
  //     fetchNext({
  //       variables: { page: page + 1 },
  //     });
  // }, [finalDivInView, loading, fetchNext]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 680) {
  //       setNumImagePerScreen(2);
  //     } else if (window.innerWidth < 900) {
  //       setNumImagePerScreen(3);
  //     } else {
  //       setNumImagePerScreen(4);
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // const maxIndex = useMemo(() => {
  //   if (!mediaData) return null;

  //   let maxIndexGoesTo;
  //   if (mediaData.length % numImagePerScreen === 0) {
  //     maxIndexGoesTo = -(mediaData.length / numImagePerScreen - 1);
  //   } else {
  //     const divide = mediaData.length / numImagePerScreen;
  //     maxIndexGoesTo = -Math.floor(divide);
  //   }

  //   return maxIndexGoesTo;
  // }, [mediaData, numImagePerScreen]);

  // useEffect(() => {
  //   if (index >= 0) {
  //     setLeftArrowInLarge(false);
  //   }
  //   if (index === maxIndex) {
  //     setRightArrowInLarge(false);
  //   }
  // }, [index, maxIndex]);

  const scrollLeft = () => {
    setIndex((prev) => prev + 1);
  };

  const scrollRight = () => {
    setIndex((prev) => prev - 1);
  };

  const debouncedScrollLeft = debounce(scrollLeft, 600);
  const debouncedScrollRight = debounce(scrollRight, 1000);

  const handleSelectedTime = async (e) => {
    // const { value } = e.target;
    // setSelectTime(value);
    // let fetchTrendingMovie = await promise(value);
    // fetchTrendingMovie = fetchTrendingMovie?.data.filter(
    //   (media) => media.backdrop_path
    // );
    // setMediaData(fetchTrendingMovie);
  };

  if (!mediaData || mediaData?.length === 0) {
    return <div className="">No data Present</div>;
  }

  return (
    <section
      className="flex flex-col gap-4 relative pt-5 pb-16"
      style={{ zIndex }}
    >
      {name && (
        <p className="ml-14 text-xl font-semibold tracking-wider tablet:ml-10 tablet:text-base">
          {name}
        </p>
      )}

      <div className="relative">
        <div className="ml-10 tablet:ml-4 mr-5">
          <div
            className="flex transition-all duration-500"
            style={{ translate: `${100 * index}%` }}
          >
            {mediaData.map((data, i) => {
              return <WatchlistTvCard key={data.id} tv={data} fixed={fixed} />;
            })}
            {/* {loading && (
                <div className="grow-0 shrink-0 basis-96 flex justify-center items-center">
                  <div className="loading" />
                </div>
              )} */}
            <div ref={findalDivRef} />
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

        {finalDivInView || (
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

export default TvHorizontalList;
