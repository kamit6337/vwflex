"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListTv from "@models/WatchlistTvModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

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
