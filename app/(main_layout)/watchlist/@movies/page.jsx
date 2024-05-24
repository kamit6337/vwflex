import userWatchlistMovies from "@api/query/watchlist/userWatchlistMovies";
import HorizontalList from "@components/HorizontalList";
const MOVIE = "movie";

const WatchlistMovie = async () => {
  const movies = await userWatchlistMovies();

  if (movies.length === 0) return;

  const modifyMovies = {
    data: movies,
  };

  return (
    <div>
      <HorizontalList
        data={modifyMovies}
        title={"Watchlist Movies"}
        zIndex={499}
        type={MOVIE}
      />
    </div>
  );
};

export default WatchlistMovie;
