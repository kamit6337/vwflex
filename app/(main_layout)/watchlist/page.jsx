"use client";
import useWatchlistQuery from "@api/query/watchlist/useWatchlistQuery";
import GeneralError from "@components/GeneralError";
import HorizontalList from "@components/HorizontalList";
import TvHorizontalList from "@components/TvHorizontalList";
import Loading from "@containers/Loading";
import Link from "next/link";
const MOVIE = "movie";

const WatchlistPage = () => {
  const { isLoading, error, data } = useWatchlistQuery();

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

  const [movies, tv] = data;

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
