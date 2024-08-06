"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListTv from "@models/WatchlistTvModel";
import { decrypt } from "@utils/encryption/encryptAndDecrypt";
import connectToDB from "@utils/mongoose/connectToDB";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const addTvToWatchlist = catchAsyncError(async (details) => {
  const token = cookies().get("token");

  if (!token) {
    throw new Error("You session has expired. Please login again");
  }

  const decoded = decrypt(token.value);
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

  revalidatePath("/watchlist");

  return "Added Successfully";
});

export default addTvToWatchlist;
