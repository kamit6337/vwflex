"use server";
import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const DAY = "day";
const WEEK = "week";

const trendingPeoples = catchAsyncError(async (time = DAY) => {
  let trendingPeoples;

  if (time === DAY) {
    trendingPeoples = await serverAxios.get(`/trending/person/${DAY}`);
  }

  if (time === WEEK) {
    trendingPeoples = await serverAxios.get(`/trending/person/${WEEK}`);
  }

  const response = {
    message: "Trending Peoples",
    data: trendingPeoples?.results,
  };
  return response;
});

export default trendingPeoples;
