import userWatchlistTv from "@api/query/watchlist/userWatchlistTv";
import TvHorizontalList from "@components/TvHorizontalList";

const WatchlistTv = async () => {
  const tv = await userWatchlistTv();

  if (tv.length === 0) return;

  return (
    <div>
      <TvHorizontalList data={tv} title={"Watchlist TV"} zIndex={399} />
    </div>
  );
};

export default WatchlistTv;
