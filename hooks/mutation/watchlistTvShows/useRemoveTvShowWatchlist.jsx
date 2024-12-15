import { useMutation } from "@apollo/client";
import checkTvInWatchlist, {
  checkTvShowInWatchlistDataQuery,
} from "@graphql/watchlist/checkTvInWatchlist";
import { getWatchlistTvShowsDataQuery } from "@graphql/watchlist/getWatchlistTvSchema";
import removeTvWatchlistSchema, {
  deleteWatchlistTvShowDataQuery,
} from "@graphql/watchlist/removeTvWatchlistSchema";

const useRemoveTvShowWatchlist = (tvId, season) => {
  const [mutation, { loading, error, data }] = useMutation(
    removeTvWatchlistSchema,
    {
      update(cache, { data: mutationData }) {
        const tvAdded = mutationData?.[deleteWatchlistTvShowDataQuery];

        if (!tvAdded) return;

        // Write the new response for the specific movie
        cache.writeQuery({
          query: checkTvInWatchlist, // The query for checking movie watchlist status
          variables: { id: tvAdded.id }, // Target specific movie ID
          data: {
            [checkTvShowInWatchlistDataQuery]: tvAdded, // Update the data for this movie
          },
        });

        // Remove the movie from the `getWatchlistMoviesDataQuery` watchlist

        const id = `${tvId}-${season}`;

        cache.modify({
          fields: {
            [getWatchlistTvShowsDataQuery](existingData = []) {
              console.log("existingData tv watchlist", existingData);
              console.log("tv id season", id);

              const newFilteredTvShows = existingData.filter((tvRef) => {
                return cache.identify(tvRef) !== `WatchlistTv:${id}`;
              });

              console.log("newFilteredTvShows", newFilteredTvShows);

              return newFilteredTvShows;
            },
          },
        });
      },
    }
  );

  return { mutation, loading, error, data };
};

export default useRemoveTvShowWatchlist;
