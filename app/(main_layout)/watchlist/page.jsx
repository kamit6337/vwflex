import userWatchlistMovies from "@api/query/watchlist/userWatchlistMovies";
import userWatchlistTv from "@api/query/watchlist/userWatchlistTv";
import HorizontalList from "@components/HorizontalList";
import TvHorizontalList from "@components/TvHorizontalList";
import Link from "next/link";
import checkUserLogin from "@api/query/auth/checkUserLogin";
import { unstable_cache } from "next/cache";
const MOVIE = "movie";

export const metadata = () => {
  return {
    title: "Watchlist",
    description: "This is my watchlist",
  };
};

const getUserWatchlist = unstable_cache(
  async (userId) => Promise.all([userWatchlistMovies(userId), userWatchlistTv(userId)]),
  ["watchlist"]
);

const WatchlistPage = async () => {
  const user = await checkUserLogin();

  if (!user) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <Link href={`/login`}>
          <p className="py-4 px-20 border rounded hover:bg-slate-700">
            Login to see your watchlist
          </p>
        </Link>
      </div>
    );
  }

const userId = user._id

  const data = await getUserWatchlist(userId);

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
