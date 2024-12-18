"use client";
import { Icons } from "@assets/icons";
import debounce from "@utils/javascript/debounce";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import TvCard from "./TvCard";
import { DAY, MOVIE, TV, WEEK } from "@constants/mediaType";
import WatchlistTvCard from "./WatchlistTvCard";
import PersonCard from "./PersonCard";

const HorizontalList = ({
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
  watchlistTv = false,
  people = false,
}) => {
  const [index, setIndex] = useState(0);
  const client = useApolloClient();
  const [leftArrowInLarge, setLeftArrowInLarge] = useState(false);
  const [rightArrowInLarge, setRightArrowInLarge] = useState(false);
  const [page, setPage] = useState(1);
  const [selectTime, setSelectTime] = useState(DAY);
  const [mediaList, setMediaList] = useState([]);
  const [fetchData, { loading, error, data }] = useLazyQuery(schema);
  const [noPagination, setNoPagination] = useState(false);

  const { ref: findalDivRef, inView: finalDivInView } = useInView({
    rootMargin: "0px 0px 0px 200px",
    triggerOnce: false,
  });

  useEffect(() => {
    if (initialData) {
      console.log("initialData ", dataQuery, initialData);

      client.cache.writeQuery({
        query: schema,
        variables: { id, page: 1 },
        data: {
          [dataQuery]: initialData,
        },
      });
    }

    if (id) {
      setMediaList([]); // Clear the previous list
      setPage(1); // Reset pagination
      fetchData({ variables: { id, page: 1 } });
    }
  }, [client, schema, initialData, id, fetchData, dataQuery]);

  useEffect(() => {
    if (data && data[dataQuery]) {
      console.log("data[query]", data[dataQuery]);

      if (data[dataQuery].length === 0) {
        setNoPagination(true);
        return;
      }

      setMediaList((prev) => [...prev, ...data[dataQuery]]);
      // setPage((prev) => prev + 1);
      const cacheData = client.cache.extract();
      console.log("Updated Apollo Cache Data:", cacheData);
    }
  }, [data, client, dataQuery]);

  useEffect(() => {
    if (noPagination || !pagination || loading || !finalDivInView) return;

    console.log("page", page);

    fetchData({ variables: { page: page + 1 } }).then(() => setPage(page + 1));
  }, [finalDivInView, fetchData, loading, page, noPagination, pagination]);

  if (error) {
    return <p>Error in List... {error.message}</p>;
  }

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

  if (!mediaList?.length) {
    return <p>No Data present</p>;
  }

  return (
    <section
      className="flex flex-col gap-4 relative pt-5 pb-16"
      style={{ zIndex }}
    >
      {name && (
        <div className="flex justify-between items-center">
          <p className="ml-14 text-xl font-semibold tracking-wider tablet:ml-10 tablet:text-base">
            {name}
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
            {mediaList.map((data, i) => {
              if (people) {
                return <PersonCard key={data.id} fixed={fixed} person={data} />;
              }

              if (watchlistTv) {
                return (
                  <WatchlistTvCard key={data.id} tv={data} fixed={fixed} />
                );
              }

              if (media === MOVIE) {
                return <MovieCard key={data.id} movie={data} fixed={fixed} />;
              }

              if (media === TV) {
                return <TvCard key={data.id} tv={data} fixed={fixed} />;
              }

              return null;
            })}
            {loading && (
              <div className="grow-0 shrink-0 basis-96 flex justify-center items-center">
                <div className="loading" />
              </div>
            )}
            <div ref={mediaList?.length > 0 ? findalDivRef : null} />
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

export default HorizontalList;
