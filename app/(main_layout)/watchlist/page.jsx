import WatchlistMoviesPage from "./WatchlistMovies";
import WatchlistTvPage from "./WatchlistTv";

export const metadata = () => {
  return {
    title: "Watchlist",
    description: "This is my watchlist",
  };
};

const WatchlistPage = () => {
  return (
    <>
      <WatchlistMoviesPage />
      <WatchlistTvPage />
    </>
  );
};

export default WatchlistPage;
