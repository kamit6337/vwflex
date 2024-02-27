"use server";

import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const nowPlayingMoviesList = catchAsyncError(async (page = 1) => {
  const nowPlayingMovies = await serverAxios.get("/movie/now_playing", {
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
