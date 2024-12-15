import { gql, useMutation } from "@apollo/client";
import checkMovieSchema, {
  getMovieInWatchlistDataQuery,
} from "@graphql/watchlist/checkMovieSchema";
import createMovieWatchlistSchema, {
  getNewMovieWatchlistDataQuery,
} from "@graphql/watchlist/createMovieWatchlistSchema";
import { getWatchlistMoviesDataQuery } from "@graphql/watchlist/getWatchlistMovieSchema";

const useCreateMovieWatchlist = (details) => {
  const [mutation, { loading, error, data }] = useMutation(
    createMovieWatchlistSchema,
    {
      update(cache, { data: mutationData }) {
        const movieAdded = mutationData?.[getNewMovieWatchlistDataQuery];
        if (!movieAdded) return;

        // Write the new response for the specific movie
        cache.writeQuery({
          query: checkMovieSchema, // The query for checking movie watchlist status
          variables: { id: movieAdded.id }, // Target specific movie ID
          data: {
            [getMovieInWatchlistDataQuery]: movieAdded, // Update the data for this movie
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
