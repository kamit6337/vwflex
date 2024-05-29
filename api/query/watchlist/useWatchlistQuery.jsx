import { useQuery } from "@tanstack/react-query";
import userWatchlistMovies from "./userWatchlistMovies";
import userWatchlistTv from "./userWatchlistTv";

const useWatchlistQuery = () => {
  const query = useQuery({
    queryKey: ["Watchlist"],
    queryFn: () => Promise.all([userWatchlistMovies(), userWatchlistTv()]),
    staleTime: Infinity,
  });

  return query;
};

export default useWatchlistQuery;
