"use server";

import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const fetchMovieDetail = catchAsyncError(
  async (id, { recommendations = true, page = 1 } = {}) => {
    const response = {};

    const movie = await getReq(`/movie/${id}`);
    response.details = movie;

    if (recommendations) {
      const movieRecommendations = await getReq(
        `/movie/${id}/recommendations`,
        { params: { page } }
      );

      response.recommendations = {
        page: movieRecommendations.page,
        data: movieRecommendations.results,
      };
    }

    return response;
  }
);

export default fetchMovieDetail;
