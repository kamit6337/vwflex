import { gql, useMutation } from "@apollo/client";
import checkTvInWatchlist, {
  checkTvShowInWatchlistDataQuery,
} from "@graphql/watchlist/checkTvInWatchlist";
import createTvWatchlistSchema, {
  postWatchlistTvShowDataQuery,
} from "@graphql/watchlist/createTvWatchlistSchema";
import { getWatchlistTvShowsDataQuery } from "@graphql/watchlist/getWatchlistTvSchema";

const useCreateTvShowInWatchlist = (details, id, season) => {
  const [mutation, { loading, error, data }] = useMutation(
    createTvWatchlistSchema,
    {
      update(cache, { data: mutationData }) {
        const tvAdded = mutationData?.[postWatchlistTvShowDataQuery];
        if (!tvAdded) return;

        // Write the new response for the specific movie
        cache.writeQuery({
          query: checkTvInWatchlist, // The query for checking movie watchlist status
          variables: { id: tvAdded.id }, // Target specific movie ID
          data: {
            [checkTvShowInWatchlistDataQuery]: tvAdded, // Update the data for this movie
          },
        });

        const modifyDetails = { ...details };
        delete modifyDetails.episodes;

        modifyDetails.id = `${id}-${season}`;

        const tvRef = cache.writeFragment({
          data: { ...modifyDetails, __typename: "WatchlistTv" },
          fragment: gql`
            fragment NewWatchlistTv on WatchlistTv {
              id
              poster_path
              overview
              air_date
              name
              season_number
              vote_average
              __typename
            }
          `,
        });

        cache.modify({
          fields: {
            [getWatchlistTvShowsDataQuery](existingData = []) {
              return [tvRef, ...existingData];
            },
          },
        });
      },
    }
  );

  return { mutation, loading, error, data };
};

export default useCreateTvShowInWatchlist;
