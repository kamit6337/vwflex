"use client";

import fetchMovieDetail from "@api/query/movie/fetchMovieDetail";
import fetchTvShowDetails from "@api/query/tv/fetchTvShowDetails";
import HorizontalList from "@components/HorizontalList";
import TvHorizontalList from "@components/TvHorizontalList";
import { watchlistState } from "@redux/slice/watchlistSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MOVIE = "movie";
const TV = "tv";

const WatchlistPage = () => {
  const { movies, tv } = useSelector(watchlistState);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchlistTv, setWatchlistTv] = useState([]);

  console.log("watchlist Tv", watchlistTv);
  console.log("watchlistMovies", watchlistMovies);
  console.log("movies", movies);
  console.log("tv", tv);

  // MARK: WATCHLIST MOVIES QUERY
  useEffect(() => {
    if (!movies || movies.length === 0) {
      return setWatchlistMovies([]);
    }
    const fetchWatchlistMovies = async () => {
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
    };

    fetchWatchlistMovies();
  }, [movies]);

  // MARK: WATCHLIST TV SHOW QUERY
  useEffect(() => {
    if (!tv || tv.length === 0) {
      return setWatchlistTv([]);
    }

    const fetchWatchlistTv = async () => {
      const promises = tv.map((obj) => {
        const { id, season } = obj;

        return fetchTvShowDetails(id, season);
      });

      const fetchAllTv = await Promise.all(promises);

      let modifyTV = fetchAllTv.map((query) => {
        return { ...query.details };
      });

      setWatchlistTv(modifyTV);
    };

    fetchWatchlistTv();
  }, [tv]);

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

export default WatchlistPage;
