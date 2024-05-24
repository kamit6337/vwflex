"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListMovie from "@models/WatchlistMovieModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import { cookies } from "next/headers";

const removeMovieFromWatchlist = catchAsyncError(async (details) => {
  const token = cookies().get("token");

  if (!token) {
    throw new Error("You session has expired. Please login again");
  }

  const decoded = verifyWebToken(token.value);
  const userId = decoded.id;

  const { id: movieId } = details;

  await WatchListMovie.deleteOne({
    user: userId,
    id: movieId,
  });



  return "Removed Successfully";
});

export default removeMovieFromWatchlist;
