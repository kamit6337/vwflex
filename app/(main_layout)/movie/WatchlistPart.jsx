"use client";

import addMovieToWatchlist from "@api/mutation/watchlist/movie/addMovieToWatchlist";
import removeMovieFromWatchlist from "@api/mutation/watchlist/movie/removeMovieFromWatchlist";
import Toastify from "@lib/Toastify";
import { useEffect, useState } from "react";

const WatchlistPart = ({ details, initial, id }) => {
  const [toggleWatchlist, setToggleWatchlist] = useState(initial);
  const { ToastContainer, showErrorMessage } = Toastify();

  useEffect(() => {
    if (id) {
      setToggleWatchlist(initial);
    }
  }, [id]);

  const handleRemoveWatchlist = async () => {
    try {
      await removeMovieFromWatchlist(details);
      setToggleWatchlist(false);
    } catch (error) {
      showErrorMessage({ message: "Something went wrong. Please try later" });
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await addMovieToWatchlist(details);
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
