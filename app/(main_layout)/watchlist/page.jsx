import userWatchlistMovies from "@api/query/watchlist/userWatchlistMovies";
import userWatchlistTv from "@api/query/watchlist/userWatchlistTv";
import Watchlist from "./watchlist";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const WatchlistPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["Watchlist"],
    queryFn: () => Promise.all([userWatchlistMovies(), userWatchlistTv()]),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Watchlist />
    </HydrationBoundary>
  );
};

export default WatchlistPage;
