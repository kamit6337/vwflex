"use server";

import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const DAY = "day";
const WEEK = "week";

const trendingMovies = catchAsyncError(async (time = DAY) => {
  let trendingMovies;

  if (time === DAY) {
    trendingMovies = await getReq(`/trending/movie/${DAY}`);
  }

  if (time === WEEK) {
    trendingMovies = await getReq(`/trending/movie/${WEEK}`);
  }

  const response = {
    message: "Trending Movie",
    data: trendingMovies?.results,
  };
  return response;
});

export default trendingMovies;
