"use server";

import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const fetchMovieDetail = catchAsyncError(
  async (id, { recommendations = true, page = 1 } = {}) => {
    const response = {};

    const movie = await serverAxios.get(`/movie/${id}`);
    response.details = movie;

    if (recommendations) {
      const movieRecommendations = await serverAxios.get(
        `/movie/${id}/recommendations`,
        { params: { page } }
      );

      response.recommendations = {
        page: movieRecommendations.page,
        data: movieRecommendations.results,
      };
    }

    // if (reviews) {
    //   const movieReviews = await serverAxios.get(`/movie/${id}/reviews`, {
    //     params: { page },
    //   });

    //   response.reviews = {
    //     totalPages: movieReviews.total_pages,
    //     page: movieReviews.page,
    //     data: movieReviews.results,
    //   };
    // }

    return response;
  }
);

export default fetchMovieDetail;
