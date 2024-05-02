"use client";

import addToWatchlist from "@api/mutation/watchlist/addToWatchlist";
import removeFromWatchlist from "@api/mutation/watchlist/removeFromWatchlist";
import {
  updateWatchlistData,
  watchlistState,
} from "@redux/slice/watchlistSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const WatchlistPart = ({ id: tvId, season }) => {
  const dispatch = useDispatch();
  const { tv, id: _id } = useSelector(watchlistState);

  const bool = useMemo(() => {
    if (tv.length === 0) return false;

    const findTv = tv.find(
      (obj) => obj.id === tvId.toString() && obj.season == season
    );

    return findTv;
  }, [tv, tvId, season]);

  const handleRemoveWatchlist = async () => {
    const response = await removeFromWatchlist(_id, { tvId, season });
    dispatch(updateWatchlistData(response));
  };

  const handleAddToWatchlist = async () => {
    const response = await addToWatchlist(_id, { tvId, season });
    dispatch(updateWatchlistData(response));
  };

  return (
    <>
      {bool ? (
        <div
          className={`border-2 border-white rounded-3xl p-3 cursor-pointer`}
          onClick={handleRemoveWatchlist}
        >
          Remove from Watchlist
        </div>
      ) : (
        <div
          className={`border-2 border-white rounded-3xl p-3 cursor-pointer`}
          onClick={handleAddToWatchlist}
        >
          Add to Watchlist
        </div>
      )}
    </>
  );
};

export default WatchlistPart;
