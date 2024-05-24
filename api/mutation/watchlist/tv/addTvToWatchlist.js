"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListTv from "@models/WatchlistTvModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

const addTvToWatchlist = catchAsyncError(async (details) => {
  const token = cookies().get("token");

  if (!token) {
    throw new Error("You session has expired. Please login again");
  }

  const decoded = verifyWebToken(token.value);
  const userId = decoded.id;

  const {
    tvId,
    season,
    air_date,
    name,
    original_name,
    poster_path,
    vote_average,
  } = details;

  await connectToDB();

 await WatchListTv.create({
    user: userId,
    tvId: Number(tvId),
    season: Number(season),
    air_date,
    name,
    original_name,
    poster_path,
    vote_average,
  });



 

  return "Added Successfully";
});

export default addTvToWatchlist;
