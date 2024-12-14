import { useApolloClient, useMutation } from "@apollo/client";
import { getMovieInWatchlistDataQuery } from "@graphql/watchlist/checkMovieSchema";
import createMovieWatchlistSchema, {
  getNewMovieWatchlistDataQuery,
} from "@graphql/watchlist/createMovieWatchlistSchema";
import { getWatchlistMoviesDataQuery } from "@graphql/watchlist/getWatchlistMovieSchema";
import { useEffect } from "react";

const useCreateMovieWatchlist = (details) => {
  const client = useApolloClient();

  // useEffect(() => {
  //   client.cache.modify({
  //     fields: {
  //       [getMovieInWatchlistDataQuery](prev) {
  //         console.log("existing data create", details?.id, prev);
  //       },
  //     },
  //   });
  // }, [details, client]);

  const [mutation, { loading, error, data }] = useMutation(
    createMovieWatchlistSchema,
    {
      // optimistic update from mutation data
      optimisticResponse: {
        [getNewMovieWatchlistDataQuery]: true, // Optimistically assume movie was added
      },
      update(cache, { data: mutationData }) {
        // mutation data return
        const movieAdded = mutationData?.[getNewMovieWatchlistDataQuery];

        if (movieAdded === null) return;

        // Update the cache for `checkMovieSchema` if movieAdded is true
        cache.modify({
          fields: {
            [getMovieInWatchlistDataQuery](prev) {
              console.log("existing data create", details?.id, prev);
              return true;
            },
          },
        });

        const movieRef = cache.writeFragment({
          data: { ...details, __typename: "MovieDetail" },
          fragment: gql`
            fragment NewMovie on MovieDetail {
              id
              backdrop_path
              overview
              release_date
              title
              vote_average
              __typename
            }
          `,
        });

        cache.modify({
          fields: {
            [getWatchlistMoviesDataQuery](existingData = []) {
              return [movieRef, ...existingData];
            },
          },
        });
      },
    }
  );

  return { mutation, loading, error, data };
};

export default useCreateMovieWatchlist;
