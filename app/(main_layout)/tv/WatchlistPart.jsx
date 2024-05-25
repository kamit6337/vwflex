"use client";

import addTvToWatchlist from "@api/mutation/watchlist/tv/addTvToWatchlist";
import removeTvFromWatchlist from "@api/mutation/watchlist/tv/removeTvFromWatchlist";
import Toastify from "@lib/Toastify";
import { useEffect, useState } from "react";

const WatchlistPart = ({ id: tvId, season, initial, details }) => {
  const [toggleWatchlist, setToggleWatchlist] = useState(initial);
  const { ToastContainer, showErrorMessage } = Toastify();
  const [isDisabledButton, setIsDisabledButton] = useState(false);

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
      setIsDisabledButton(true);
      await removeTvFromWatchlist(obj);
      setToggleWatchlist(false);
    } catch (error) {
      showErrorMessage({ message: "Something went wrong. Please try later" });
    } finally {
      setIsDisabledButton(false);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      setIsDisabledButton(true);
      await addTvToWatchlist(obj);
      setToggleWatchlist(true);
    } catch (error) {
      showErrorMessage({ message: "Something went wrong. Please try later" });
    } finally {
      setIsDisabledButton(false);
    }
  };

  return (
    <>
      {toggleWatchlist ? (
        <button
          disabled={isDisabledButton}
          className={`rounded-3xl p-3 px-5 cursor-pointer bg-gray-400`}
          onClick={handleRemoveWatchlist}
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          disabled={isDisabledButton}
          className={`border-2 border-white rounded-3xl p-3 px-5 cursor-pointer`}
          onClick={handleAddToWatchlist}
        >
          Add to Watchlist
        </button>
      )}
      <ToastContainer />
    </>
  );
};

export default WatchlistPart;
