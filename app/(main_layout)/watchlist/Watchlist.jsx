"use client";
import { useQuery } from "@apollo/client";
import Loading from "@containers/Loading";
import loginCheckSchema, {
  getLoginCheckDataQuery,
} from "@graphql/auth/loginCheckSchema";
import WatchlistMovies from "./WatchlistMovies";
import WatchlistTvShows from "./WatchlistTvShows";
import LogCacheData from "@lib/LogCachedData";

const Watchlist = ({ fixed }) => {

  const {
    loading: loginCheckLoading,
    error: loginCheckError,
    data: userData,
  } = useQuery(loginCheckSchema);

  if (loginCheckLoading) {
    return <Loading hScreen={true} />;
  }

  if (loginCheckError) {
    console.error("Error in profile", loginCheckError?.message);
    return;
  }

  if (!userData) {
    return <p>Please login to see watchlist</p>;
  }

  return (
    <>
      <WatchlistMovies fixed={fixed} />
      <WatchlistTvShows fixed={fixed} />
    </>
  );
};

export default Watchlist;
