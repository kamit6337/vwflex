"use client";
import { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import LoginButton from "@components/LoginButton";
import loginCheckSchema, {
  getLoginCheckDataQuery,
} from "@graphql/auth/loginCheckSchema";
import checkTvInWatchlist, {
  checkTvShowInWatchlistDataQuery,
} from "@graphql/watchlist/checkTvInWatchlist";
import useCreateTvShowInWatchlist from "@hooks/mutation/watchlistTvShows/useCreateTvShowInWatchlist";
import LogCacheData from "@lib/LogCachedData";
import useRemoveTvShowWatchlist from "@hooks/mutation/watchlistTvShows/useRemoveTvShowWatchlist";

const WatchlistPart = ({ details, id, season }) => {
  LogCacheData();

  const {
    loading: loginCheckLoading,
    error: loginCheckError,
    data: userData,
  } = useQuery(loginCheckSchema);

  const [queryTvInWatchlist, { loading, data, error }] =
    useLazyQuery(checkTvInWatchlist);

  const { mutation: createWatchlist, loading: createLoading } =
    useCreateTvShowInWatchlist(details, id, season);

  const { mutation: removeWatchlist, loading: removeLoading } =
    useRemoveTvShowWatchlist(id, season);

  useEffect(() => {
    if (userData && userData[getLoginCheckDataQuery]) {
      queryTvInWatchlist({
        variables: { id: Number(id), season: Number(season) },
      });
    }
  }, [userData, queryTvInWatchlist, id, season]);

  if (loginCheckLoading) return;

  if (loginCheckError) {
    console.error("Error in profile", loginCheckError.message);
    return <LoginButton />;
  }

  if (error) {
    console.log("error in getting watchlist", error);
  }

  if (loading || error) return;

  const bool = data?.[checkTvShowInWatchlistDataQuery]?.bool;

  return (
    <>
      {bool ? (
        <button
          className={`rounded-3xl p-3 px-5 cursor-pointer bg-gray-400`}
          disabled={removeLoading}
          onClick={() =>
            removeWatchlist({
              variables: { id: Number(id), season: Number(season) },
            })
          }
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          disabled={createLoading}
          className={`border-2 border-white rounded-3xl p-3 px-5 cursor-pointer hover:text-gray-300`}
          onClick={() =>
            createWatchlist({
              variables: { id: Number(id), season: Number(season) },
            })
          }
        >
          Add to Watchlist
        </button>
      )}
    </>
  );
};

export default WatchlistPart;
