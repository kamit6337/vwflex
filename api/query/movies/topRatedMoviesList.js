"use server";
import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const topRatedMoviesList = catchAsyncError(async (page = 1) => {
  const topRatedMovies = await serverAxios.get("/movie/top_rated", {
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
