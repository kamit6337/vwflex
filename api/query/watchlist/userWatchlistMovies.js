"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListMovie from "@models/WatchlistMovieModel";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";

const userWatchlistMovies = catchAsyncError(async (userId) => {
  await connectToDB();

  const movies = await WatchListMovie.find({
    user: userId,
  })
    .lean()
    .sort("-createdAt");

  const serializedMovies = movies.map((obj) => {
    return makeSerializable(obj);
  });

  return serializedMovies;
});

export default userWatchlistMovies;
