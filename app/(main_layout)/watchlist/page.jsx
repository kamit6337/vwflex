import userWatchlistMovies from "@api/query/watchlist/userWatchlistMovies";
import userWatchlistTv from "@api/query/watchlist/userWatchlistTv";
import Link from "next/link";

const WatchlistPage = async () => {
  const [movies, tv] = await Promise.all([
    userWatchlistMovies(),
    userWatchlistTv(),
  ]);

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

  return null;
};

export default WatchlistPage;
