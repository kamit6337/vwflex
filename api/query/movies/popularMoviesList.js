"use server";

import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const popularMoviesList = catchAsyncError(async (page = 1) => {
  const popularMovies = await getReq("/movie/popular", {
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
