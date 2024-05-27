"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListMovie from "@models/WatchlistMovieModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

const isMovieInWatchlist = catchAsyncError(async (movieId) => {
  const token = cookies().get("token");

  if (!token) {
    return false;
  }

  const decoded = verifyWebToken(token.value);

  const userId = decoded.id;

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
