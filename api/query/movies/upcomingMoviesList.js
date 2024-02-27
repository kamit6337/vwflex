"use server";

import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const upcomingMoviesList = catchAsyncError(async (page = 1) => {
  const upcomingMovies = await serverAxios.get("/movie/upcoming", {
    params: { page },
  });

  const response = {
    totalPages: upcomingMovies.total_pages,
    page: upcomingMovies.page,
    data: upcomingMovies.results,
    message: "Upcoming Movies list",
  };

  return response;
});

export default upcomingMoviesList;
