import { fixed } from "@api/query/initialFetch";
import MoviesHorizontalList from "./moviesHorizontalList/MoviesHorizontalList";

const MoviesSection = async ({
  id,
  title,
  promise,
  zIndex,
  instant = false,
}) => {
  const fixedQuery = await fixed();

  let query;
  if (instant) {
    query = await promise();
  }

  return (
    <MoviesHorizontalList
      id={id}
      title={title}
      data={query}
      instant={instant}
      fixed={fixedQuery}
      promise={promise}
      zIndex={zIndex}
    />
  );
};

export default MoviesSection;
