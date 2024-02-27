"use server";

import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const popularMoviesList = catchAsyncError(async (page = 1) => {
  const popularMovies = await serverAxios.get("/movie/popular", {
    params: { page },
  });

  const response = {
    totalPages: popularMovies.total_pages,

    page: popularMovies.page,
    data: popularMovies.results,
    message: "Popular Movies list",
  };

  return response;
});

export default popularMoviesList;
