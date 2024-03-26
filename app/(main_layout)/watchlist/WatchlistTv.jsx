"use client";

import fetchTvShowDetails from "@api/query/tv/fetchTvShowDetails";
import TvHorizontalList from "@components/TvHorizontalList";
import Loading from "@containers/Loading";
import { watchlistState } from "@redux/slice/watchlistSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TV = "tv";

const WatchlistTvPage = () => {
  const { tv } = useSelector(watchlistState);
  const [watchlistTv, setWatchlistTv] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // MARK: WATCHLIST TV SHOW QUERY
  useEffect(() => {
    if (!tv || tv.length === 0) {
      setIsLoading(false);
      setWatchlistTv([]);
      return;
    }

    const fetchWatchlistTv = async () => {
      try {
        const promises = tv.map((obj) => {
          const { id, season } = obj;

          return fetchTvShowDetails(id, season);
        });

        const fetchAllTv = await Promise.all(promises);

        let modifyTV = fetchAllTv.map((query) => {
          return { ...query.details };
        });

        setWatchlistTv(modifyTV);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlistTv();
  }, [tv]);

  if (isLoading) {
    return (
      <div className="w-full h-96">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {watchlistTv.length > 0 && (
          <TvHorizontalList
            data={watchlistTv}
            title={"Watchlist TV"}
            zIndex={399}
          />
        )}
      </div>
    </>
  );
};

export default WatchlistTvPage;
