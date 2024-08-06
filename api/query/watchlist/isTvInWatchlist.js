"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListTv from "@models/WatchlistTvModel";
import { decrypt } from "@utils/encryption/encryptAndDecrypt";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

const isTvInWatchlist = catchAsyncError(async (tvId, season) => {
  const token = cookies().get("token");

  if (!token) {
    return false;
  }

  const decoded = decrypt(token.value);

  const userId = decoded.id;

  if (!season) return;

  await connectToDB();

  const findTv = await WatchListTv.findOne({
    user: userId,
    tvId: Number(tvId),
    season: Number(season),
  });

  if (findTv) {
    return true;
  }

  return false;
});

export default isTvInWatchlist;
