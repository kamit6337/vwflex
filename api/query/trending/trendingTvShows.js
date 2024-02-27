import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const DAY = "day";
const WEEK = "week";

const trendingTvShows = catchAsyncError(async (time = DAY) => {
  let trendingtv;

  if (time === DAY) {
    trendingtv = await serverAxios.get(`/trending/movie/${DAY}`);
  }

  if (time === WEEK) {
    trendingtv = await serverAxios.get(`/trending/movie/${WEEK}`);
  }

  const response = {
    message: "Trending TV Shows",
    data: trendingtv?.results,
  };
  return response;
});

export default trendingTvShows;
