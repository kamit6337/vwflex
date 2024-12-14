import { useMutation } from "@apollo/client";
import checkMovieSchema, {
  getMovieInWatchlistDataQuery,
} from "@graphql/watchlist/checkMovieSchema";
import { getWatchlistMoviesDataQuery } from "@graphql/watchlist/getWatchlistMovieSchema";
import removeMovieWatchlistSchema, {
  removeMovieWatchlistDataQuery,
} from "@graphql/watchlist/removeMovieWatchlistSchema";

const useRemoveMovieWatchlist = (movieId) => {
  const [mutation, { loading, error, data }] = useMutation(
    removeMovieWatchlistSchema,
    {
      update(cache, { data: mutationData }) {
        const movieAdded = mutationData?.[removeMovieWatchlistDataQuery];

        if (!movieAdded) return;

        // Write the new response for the specific movie
        cache.writeQuery({
          query: checkMovieSchema, // The query for checking movie watchlist status
          variables: { id: movieAdded.id }, // Target specific movie ID
          data: {
            [getMovieInWatchlistDataQuery]: movieAdded, // Update the data for this movie
          },
        });
      },
    }
  );

  return { mutation, loading, error, data };
};

export default useRemoveMovieWatchlist;
