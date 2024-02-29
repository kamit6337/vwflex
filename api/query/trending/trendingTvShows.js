"use server";
import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const DAY = "day";
const WEEK = "week";

const trendingTvShows = catchAsyncError(async (time = DAY) => {
  let trendingtv;

  if (time === DAY) {
    trendingtv = await serverAxios.get(`/trending/tv/${DAY}`);
  }

  if (time === WEEK) {
    trendingtv = await serverAxios.get(`/trending/tv/${WEEK}`);
  }

  const response = {
    message: "Trending TV Shows",
    data: trendingtv?.results,
  };
  return response;
});

export default trendingTvShows;
