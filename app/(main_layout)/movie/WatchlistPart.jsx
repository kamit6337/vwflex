"use client";
import { useLazyQuery, useQuery } from "@apollo/client";
import LoginButton from "@components/LoginButton";
import loginCheckSchema, {
  getLoginCheckDataQuery,
} from "@graphql/auth/loginCheckSchema";
import checkMovieSchema, {
  getMovieInWatchlistDataQuery,
} from "@graphql/watchlist/checkMovieSchema";
import useCreateMovieWatchlist from "@hooks/mutation/watchlistMovie/useCreateMovieWatchlist";
import useRemoveMovieWatchlist from "@hooks/mutation/watchlistMovie/useRemoveMovieWatchlist";
import LogCacheData from "@lib/LogCachedData";
import { useEffect } from "react";

const WatchlistPart = ({ details, id }) => {
  LogCacheData();

  const {
    loading: loginCheckLoading,
    error: loginCheckError,
    data: userData,
  } = useQuery(loginCheckSchema);

  const [queryMovieInWatchlist, { loading, data, error }] =
    useLazyQuery(checkMovieSchema);

  const { mutation: createWatchlist, loading: createLoading } =
    useCreateMovieWatchlist(details);

  const { mutation: removeWatchlist, loading: removeLoading } =
    useRemoveMovieWatchlist(id);

  useEffect(() => {
    if (userData && userData[getLoginCheckDataQuery]) {
      queryMovieInWatchlist({ variables: { id: Number(id) } });
    }
  }, [userData, queryMovieInWatchlist, id]);

  if (loginCheckLoading) return;

  if (loginCheckError) {
    console.error("Error in profile", loginCheckError.message);
    return <LoginButton />;
  }

  if (error) {
    console.log("error in getting watchlist", error);
  }

  if (loading || error) return;

  console.log("data", id, data);

  const bool = data?.[getMovieInWatchlistDataQuery]?.bool;
  return (
    <>
      {bool ? (
        <button
          className={`rounded-3xl p-3 px-5 cursor-pointer bg-gray-400`}
          disabled={removeLoading}
          onClick={() => removeWatchlist({ variables: { id: Number(id) } })}
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          disabled={createLoading}
          className={`border-2 border-white rounded-3xl p-3 px-5 cursor-pointer hover:text-gray-300`}
          onClick={() => createWatchlist({ variables: { id: Number(id) } })}
        >
          Add to Watchlist
        </button>
      )}
    </>
  );
};

export default WatchlistPart;
