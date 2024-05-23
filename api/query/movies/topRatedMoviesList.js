"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const topRatedMoviesList = catchAsyncError(async (page = 1) => {
  const topRatedMovies = await getReq("/movie/top_rated", {
    params: { page },
  });

  const response = {
    totalPages: topRatedMovies.total_pages,

    page: topRatedMovies.page,
    data: topRatedMovies.results,
    message: "Top-Rated Movies list",
  };

  return response;
});

export default topRatedMoviesList;
