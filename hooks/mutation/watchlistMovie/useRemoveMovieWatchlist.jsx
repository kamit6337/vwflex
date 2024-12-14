import { useApolloClient, useMutation } from "@apollo/client";
import { getMovieInWatchlistDataQuery } from "@graphql/watchlist/checkMovieSchema";
import { getWatchlistMoviesDataQuery } from "@graphql/watchlist/getWatchlistMovieSchema";
import removeMovieWatchlistSchema, {
  removeMovieWatchlistDataQuery,
} from "@graphql/watchlist/removeMovieWatchlistSchema";
import { useEffect } from "react";

const useRemoveMovieWatchlist = (movieId) => {
  const client = useApolloClient();

  // useEffect(() => {
  //   client.cache.modify({
  //     fields: {
  //       [getMovieInWatchlistDataQuery](prev) {
  //         console.log("existing data remove", movieId, prev);
  //       },
  //     },
  //   });
  // }, [movieId, client]);

  const [mutation, { loading, error, data }] = useMutation(
    removeMovieWatchlistSchema,
    {
      // optimistic update from mutation data
      optimisticResponse: {
        [removeMovieWatchlistDataQuery]: false, // Optimistically assume movie was added
      },
      update(cache, { data: mutationData }) {
        // mutation data return
        const movieAdded = mutationData?.[removeMovieWatchlistDataQuery];

        if (movieAdded === null) return;

        // Update the cache for `checkMovieSchema` if movieAdded is true
        cache.modify({
          fields: {
            [getMovieInWatchlistDataQuery](prev) {
              console.log("existing data create", movieId, prev);

              return false;
            },
          },
        });

        cache.modify({
          fields: {
            [getWatchlistMoviesDataQuery](existingData = []) {
              if (existingData.length === 0) {
                return [];
              }

              console.log("existing movies from watchlist", existingData);

              return existingData.filter(
                (ref) =>
                  ref.__ref !== `MovieDetail:${movieId}` ||
                  ref.id?.toString() !== movieId?.toString()
              );
            },
          },
        });
      },
    }
  );

  return { mutation, loading, error, data };
};

export default useRemoveMovieWatchlist;
