"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListTv from "@models/WatchlistTvModel";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";

const userWatchlistTv = catchAsyncError(async (userId) => {
  await connectToDB();

  const movies = await WatchListTv.find({
    user: userId,
  })
    .lean()
    .sort("-createdAt");

  const serializedTv = movies.map((obj) => {
    return makeSerializable(obj);
  });

  return serializedTv;
});

export default userWatchlistTv;
