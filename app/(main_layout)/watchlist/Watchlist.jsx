"use client";
import { useQuery } from "@apollo/client";
import HorizontalList from "@components/HorizontalList";
import { MOVIE } from "@constants/mediaType";
import Loading from "@containers/Loading";
import getWatchlistMovieSchema, {
  getWatchlistMoviesDataQuery,
} from "@graphql/watchlist/getWatchlistMovieSchema";

const Watchlist = ({ fixed }) => {
  const { loading, error, data } = useQuery(getWatchlistMovieSchema);

  if (loading) {
    return <Loading hScreen={true} />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const movieList = data?.[getWatchlistMoviesDataQuery];

  console.log("movieList", movieList);

  return (
    <>
      <HorizontalList
        schema={getWatchlistMovieSchema}
        dataQuery={getWatchlistMoviesDataQuery}
        name={"Watchlist Movies"}
        initialData={movieList}
        media={MOVIE}
        zIndex={20}
        fixed={fixed}
      />
    </>
  );
};

export default Watchlist;
