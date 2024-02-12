import { fixed, popularMoviesList } from "@api/query/initialFetch";
import MoviesHorizontalList from "./moviesHorizontalList/MoviesHorizontalList";

const PopularMovie = async () => {
  const fixedQuery = await fixed();
  const query = await popularMoviesList();

  return (
    <MoviesHorizontalList
      title={`Popular`}
      data={query}
      fixed={fixedQuery}
      promise={popularMoviesList}
      zIndex={998}
    />
  );
};

export default PopularMovie;
