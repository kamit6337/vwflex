"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListMovie from "@models/WatchlistMovieModel";
import connectToDB from "@utils/mongoose/connectToDB";

const isMovieInWatchlist = catchAsyncError(async (user, movieId) => {
  if (!user) {
    return;
  }

  const userId = user._id;

  await connectToDB();

  const findMovie = await WatchListMovie.findOne({
    user: userId,
    id: Number(movieId),
  });

  if (findMovie) {
    return true;
  }

  return false;
});

export default isMovieInWatchlist;
