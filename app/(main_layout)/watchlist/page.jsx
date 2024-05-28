"use client";
import userWatchlistMovies from "@api/query/watchlist/userWatchlistMovies";
import userWatchlistTv from "@api/query/watchlist/userWatchlistTv";
import GeneralError from "@components/GeneralError";
import HorizontalList from "@components/HorizontalList";
import TvHorizontalList from "@components/TvHorizontalList";
import Loading from "@containers/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";
const MOVIE = "movie";

const WatchlistPage = () => {
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const [movies, tv] = await Promise.all([
          userWatchlistMovies(),
          userWatchlistTv(),
        ]);
        setMovies(movies);
        setTv(tv);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="h-96">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <GeneralError />;
  }

  if (movies.length === 0 && tv.length === 0) {
    return (
      <div className="h-96 w-full flex flex-col gap-2 justify-center items-center">
        <p>You have not watchlisted any movies or tv shows.</p>
        <p>
          Go to
          <span className="underline underline-offset-4 mx-1">
            <Link href={"/movies"}>Movies</Link>
          </span>
          or
          <span className="underline underline-offset-4 ml-1">
            <Link href={"/tvShows"}>TV Shows</Link>
          </span>
        </p>
      </div>
    );
  }

  const modifyMovies = {
    data: movies,
  };

  return (
    <>
      {movies.length > 0 && (
        <div>
          <HorizontalList
            data={modifyMovies}
            title={"Watchlist Movies"}
            zIndex={499}
            type={MOVIE}
          />
        </div>
      )}
      {tv.length > 0 && (
        <div>
          <TvHorizontalList data={tv} title={"Watchlist TV"} zIndex={399} />
        </div>
      )}
    </>
  );
};

export default WatchlistPage;
