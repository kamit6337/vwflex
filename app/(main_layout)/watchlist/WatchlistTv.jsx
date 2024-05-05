"use client";

import fetchTvShowDetails from "@api/query/tv/fetchTvShowDetails";
import TvHorizontalList from "@components/TvHorizontalList";
import { watchlistState } from "@redux/slice/watchlistSlice";
import { useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const WatchlistTvPage = () => {
  const { tv } = useSelector(watchlistState);

  const { data, error, isLoading } = useQueries({
    queries: tv.map((obj) => {
      const { id, season } = obj;

      return {
        queryKey: ["TV Show Detail", id, season],
        queryFn: () => fetchTvShowDetails(id, season),
        staleTime: Infinity,
        enabled: !!id,
      };
    }),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        error: results.some((result) => result.error),
      };
    },
  });

  if (tv.length === 0) return;

  if (isLoading) return;

  if (error) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, there is some issue in getting your watchlist tv shows</p>
      </div>
    );
  }

  let modifyTV = data.map((query) => {
    return { ...query.details };
  });

  return (
    <>
      <div>
        {modifyTV.length > 0 && (
          <TvHorizontalList
            data={modifyTV}
            title={"Watchlist TV"}
            zIndex={399}
          />
        )}
      </div>
    </>
  );
};

export default WatchlistTvPage;
