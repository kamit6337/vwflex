"use client";

import addToWatchlist from "@api/mutation/watchlist/addToWatchlist";
import removeFromWatchlist from "@api/mutation/watchlist/removeFromWatchlist";
import {
  updateWatchlistData,
  watchlistState,
} from "@redux/slice/watchlistSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const WatchlistPart = ({ id: movieId }) => {
  const dispatch = useDispatch();
  const { movies, id: _id } = useSelector(watchlistState);

  const bool = useMemo(() => {
    if (movies.length === 0) return false;

    const findMovie = movies.includes(movieId.toString());

    return findMovie;
  }, [movies, movieId]);

  const handleRemoveWatchlist = async () => {
    const response = await removeFromWatchlist(_id, { movieId });
    dispatch(updateWatchlistData(response));
  };

  const handleAddToWatchlist = async () => {
    const response = await addToWatchlist(_id, { movieId });
    dispatch(updateWatchlistData(response));
  };

  return (
    <>
      {bool ? (
        <div
          className={`rounded-3xl p-3 px-5 cursor-pointer bg-gray-400`}
          onClick={handleRemoveWatchlist}
        >
          Remove from Watchlist
        </div>
      ) : (
        <div
          className={`border-2 border-white rounded-3xl p-3 px-5 cursor-pointer`}
          onClick={handleAddToWatchlist}
        >
          Add to Watchlist
        </div>
      )}
    </>
  );
};

export default WatchlistPart;
