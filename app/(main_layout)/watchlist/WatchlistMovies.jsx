"use client";

import fetchMovieDetail from "@api/query/movie/fetchMovieDetail";
import HorizontalList from "@components/HorizontalList";
import Loading from "@containers/Loading";
import { watchlistState } from "@redux/slice/watchlistSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MOVIE = "movie";

const WatchlistMoviesPage = () => {
  const { movies } = useSelector(watchlistState);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // MARK: WATCHLIST MOVIES QUERY
  useEffect(() => {
    if (!movies || movies.length === 0) {
      setWatchlistMovies([]);
      setIsLoading(false);
      return;
    }
    const fetchWatchlistMovies = async () => {
      try {
        const promises = movies.map((id) => {
          return fetchMovieDetail(Number(id), {
            images: false,
            recommendations: false,
            reviews: false,
            similar: false,
          });
        });

        const fetchAllMovies = await Promise.all(promises);

        let modifyMovies = fetchAllMovies.map((query) => {
          return { ...query.details };
        });
        modifyMovies = {
          data: modifyMovies,
        };
        setWatchlistMovies(modifyMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlistMovies();
  }, [movies]);

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
        {watchlistMovies.data?.length > 0 && (
          <HorizontalList
            data={watchlistMovies}
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
