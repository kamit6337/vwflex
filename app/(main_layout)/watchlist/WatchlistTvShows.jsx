import { useQuery } from "@apollo/client";
import HorizontalList from "@components/HorizontalList";
import TvHorizontalList from "@components/TvHorizontalList";
import { TV } from "@constants/mediaType";
import Loading from "@containers/Loading";
import getWatchlistTvSchema, {
  getWatchlistTvShowsDataQuery,
} from "@graphql/watchlist/getWatchlistTvSchema";
import LogCacheData from "@lib/LogCachedData";

const WatchlistTvShows = ({ fixed }) => {
  const { loading, error, data } = useQuery(getWatchlistTvSchema, {
    variables: { page: 1 },
  });

  LogCacheData();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  console.log("tv List", data);

  const tvList = data?.[getWatchlistTvShowsDataQuery];

  return (
    <>
      <HorizontalList
        id={"watchlsitvtvId"}
        watchlistTv={true}
        schema={getWatchlistTvSchema}
        dataQuery={getWatchlistTvShowsDataQuery}
        name={"Watchlist TV Shows"}
        initialData={tvList}
        media={TV}
        zIndex={19}
        fixed={fixed}
      />
    </>
  );
};

export default WatchlistTvShows;
