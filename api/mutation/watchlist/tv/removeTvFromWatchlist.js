"use server";
import catchAsyncError from "@lib/catchAsyncError";
import WatchListTv from "@models/WatchlistTvModel";
import { decrypt } from "@utils/encryption/encryptAndDecrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const removeTvFromWatchlist = catchAsyncError(async (details) => {
  const token = cookies().get("token");

  if (!token) {
    throw new Error("You session has expired. Please login again");
  }

  const decoded = decrypt(token.value);
  const userId = decoded.id;

  const { tvId, season } = details;

  await WatchListTv.deleteOne({
    user: userId,
    tvId: Number(tvId),
    season: Number(season),
  });

  revalidatePath("/watchlist");

  return "Removed Successfully";
});

export default removeTvFromWatchlist;
