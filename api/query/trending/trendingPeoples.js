"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const DAY = "day";
const WEEK = "week";

const trendingPeoples = catchAsyncError(async (time = DAY) => {
  let trendingPeoples;

  if (time === DAY) {
    trendingPeoples = await getReq(`/trending/person/${DAY}`);
  }

  if (time === WEEK) {
    trendingPeoples = await getReq(`/trending/person/${WEEK}`);
  }

  const response = {
    message: "Trending Peoples",
    data: trendingPeoples?.results,
  };
  return response;
});

export default trendingPeoples;
