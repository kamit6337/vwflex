import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const DAY = "day";
const WEEK = "week";

const trendingPeoples = catchAsyncError(async (time = DAY) => {
  let trendingPeoples;

  if (time === DAY) {
    trendingPeoples = await serverAxios.get(`/trending/movie/${DAY}`);
  }

  if (time === WEEK) {
    trendingPeoples = await serverAxios.get(`/trending/movie/${WEEK}`);
  }

  const response = {
    message: "Trending Peopless",
    data: trendingPeoples?.results,
  };
  return response;
});

export default trendingPeoples;
