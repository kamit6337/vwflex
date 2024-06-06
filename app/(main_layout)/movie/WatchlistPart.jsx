"use client";

import addMovieToWatchlist from "@api/mutation/watchlist/movie/addMovieToWatchlist";
import removeMovieFromWatchlist from "@api/mutation/watchlist/movie/removeMovieFromWatchlist";
import isMovieInWatchlist from "@api/query/watchlist/isMovieInWatchlist";
import Toastify from "@lib/Toastify";
import { useEffect, useState } from "react";

const WatchlistPart = ({ details, id }) => {
  const [toggleWatchlist, setToggleWatchlist] = useState(false);
  const { ToastContainer, showErrorMessage } = Toastify();
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const movieWatchlist = await isMovieInWatchlist(id);
        setToggleWatchlist(movieWatchlist);
      })();
    }
  }, [id]);

  const handleRemoveWatchlist = async () => {
    try {
      setIsDisabledButton(true);
      await removeMovieFromWatchlist(details);
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
      await addMovieToWatchlist(details);
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
