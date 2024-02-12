import { fixed, upcomingMoviesList } from "@api/query/initialFetch";
import MoviesHorizontalList from "./moviesHorizontalList/MoviesHorizontalList";

const UpcomingMovie = async () => {
  const fixedQuery = await fixed();

  const query = await upcomingMoviesList();

  return (
    <MoviesHorizontalList
      title={`Upcoming`}
      data={query}
      fixed={fixedQuery}
      promise={upcomingMoviesList}
      zIndex={999}
    />
  );
};

export default UpcomingMovie;
