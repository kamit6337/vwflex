"use server";

import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const nowPlayingMoviesList = catchAsyncError(async (page = 1) => {
  const nowPlayingMovies = await getReq("/movie/now_playing", {
    params: { page },
  });

  const response = {
    totalPages: nowPlayingMovies.total_pages,
    page: nowPlayingMovies.page,
    data: nowPlayingMovies.results,
    message: "Now-Playing Movies list",
  };

  return response;
});

export default nowPlayingMoviesList;
