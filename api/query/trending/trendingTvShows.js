"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const DAY = "day";
const WEEK = "week";

const trendingTvShows = catchAsyncError(async (time = DAY) => {
  let trendingtv;

  if (time === DAY) {
    trendingtv = await getReq(`/trending/tv/${DAY}`);
  }

  if (time === WEEK) {
    trendingtv = await getReq(`/trending/tv/${WEEK}`);
  }

  const response = {
    message: "Trending TV Shows",
    data: trendingtv?.results,
  };
  return response;
});

export default trendingTvShows;
