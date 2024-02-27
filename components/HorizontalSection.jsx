import { fixed } from "@api/query/initialFetch";
import MoviesHorizontalList from "./movies/MoviesHorizontalList";
import TvHorizontalList from "./tv/TvHorizontalList";
import PeoplesHorizontalList from "./peoples/PeoplesHorizontalList";

const HorizontalSection = async ({
  id,
  title,
  promise,
  zIndex,
  type,
  instant = false,
}) => {
  const fixedQuery = await fixed();

  let query;
  if (instant) {
    query = await promise();
  }

  if (type === "person") {
    return (
      <PeoplesHorizontalList
        id={id}
        title={title}
        data={query}
        instant={instant}
        fixed={fixedQuery}
        promise={promise}
        zIndex={zIndex}
      />
    );
  }

  if (type === "movie") {
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
  }

  if (type === "tv") {
    return (
      <TvHorizontalList
        id={id}
        title={title}
        data={query}
        instant={instant}
        fixed={fixedQuery}
        promise={promise}
        zIndex={zIndex}
      />
    );
  }
};

export default HorizontalSection;
