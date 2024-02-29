"use server";

import catchAsyncError from "@lib/catchAsyncError";
import Watchlist from "@models/WartchlistModel";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";

const userWatchlist = catchAsyncError(async (userId) => {
  await connectToDB();

  const watchlist = await Watchlist.findOne({
    user: userId,
  }).lean();

  return makeSerializable(watchlist);
});

export default userWatchlist;
