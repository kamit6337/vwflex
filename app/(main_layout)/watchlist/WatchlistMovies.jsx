import { useQuery } from "@apollo/client";
import HorizontalList from "@components/HorizontalList";
import { MOVIE } from "@constants/mediaType";
import Loading from "@containers/Loading";
import getWatchlistMovieSchema, {
  getWatchlistMoviesDataQuery,
} from "@graphql/watchlist/getWatchlistMovieSchema";

const WatchlistMovies = ({ fixed }) => {
  const { loading, error, data } = useQuery(getWatchlistMovieSchema, {
    variables: { page: 1 },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  const movieList = data?.[getWatchlistMoviesDataQuery];

  console.log("movieList", movieList);

  return (
    <>
      <HorizontalList
        id={"1245678900-"}
        schema={getWatchlistMovieSchema}
        dataQuery={getWatchlistMoviesDataQuery}
        name={"Watchlist Movies"}
        initialData={movieList}
        media={MOVIE}
        zIndex={20}
        fixed={fixed}
        pagination={true}
      />
    </>
  );
};

export default WatchlistMovies;
