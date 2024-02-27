import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const DAY = "day";
const WEEK = "week";

const trendingMovies = catchAsyncError(async (time = DAY) => {
  let trendingMovies;

  if (time === DAY) {
    trendingMovies = await serverAxios.get(`/trending/movie/${DAY}`);
  }

  if (time === WEEK) {
    trendingMovies = await serverAxios.get(`/trending/movie/${WEEK}`);
  }

  const response = {
    message: "Trending Movie",
    data: trendingMovies?.results,
  };
  return response;
});

export default trendingMovies;
