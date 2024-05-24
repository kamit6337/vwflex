"use client";

import addTvToWatchlist from "@api/mutation/watchlist/tv/addTvToWatchlist";
import removeTvFromWatchlist from "@api/mutation/watchlist/tv/removeTvFromWatchlist";
import Toastify from "@lib/Toastify";
import { useEffect, useState } from "react";

const WatchlistPart = ({ id: tvId, season, initial, details }) => {
  const [toggleWatchlist, setToggleWatchlist] = useState(initial);
  const { ToastContainer, showErrorMessage } = Toastify();

  const obj = {
    ...details,
    tvId,
    season,
  };

  useEffect(() => {
    if (tvId && season) {
      setToggleWatchlist(initial);
    }
  }, [tvId, season]);

  const handleRemoveWatchlist = async () => {
    try {
      await removeTvFromWatchlist(obj);
      setToggleWatchlist(false);
    } catch (error) {
      showErrorMessage({ message: "Something went wrong. Please try later" });
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await addTvToWatchlist(obj);
      setToggleWatchlist(true);
    } catch (error) {
      showErrorMessage({ message: "Something went wrong. Please try later" });
    }
  };

  return (
    <>
      {toggleWatchlist ? (
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
      <ToastContainer />
    </>
  );
};

export default WatchlistPart;
