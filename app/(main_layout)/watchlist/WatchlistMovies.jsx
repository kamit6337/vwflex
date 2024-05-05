"use client";

import fetchMovieDetail from "@api/query/movie/fetchMovieDetail";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import { watchlistState } from "@redux/slice/watchlistSlice";
import { useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const MOVIE = "movie";

const WatchlistMoviesPage = () => {
  const { movies } = useSelector(watchlistState);

  const { data, error, isLoading } = useQueries({
    queries: movies.map((id) => ({
      queryKey: ["Watchlist Movies", id],
      queryFn: () =>
        fetchMovieDetail(Number(id), {
          images: false,
          recommendations: false,
          reviews: false,
          similar: false,
        }),
      staleTime: Infinity,
      enabled: movies.length > 0,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        error: results.some((result) => result.error),
      };
    },
  });

  if (movies.length === 0) return;

  if (isLoading) return;

  if (error) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, there is some issue in getting your watchlist movies</p>
      </div>
    );
  }

  let modifyMovies = data.map((query) => {
    return { ...query.details };
  });
  modifyMovies = {
    data: modifyMovies,
  };

  return (
    <>
      <div>
        {modifyMovies.data?.length > 0 && (
          <HorizontalList
            data={modifyMovies}
            title={"Watchlist Movies"}
            zIndex={499}
            type={MOVIE}
          />
        )}
      </div>
    </>
  );
};

export default WatchlistMoviesPage;
