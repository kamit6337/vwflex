"use server";

import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const fetchMovieAdditional = catchAsyncError(
  async (
    id,
    { reviews = false, images = false, similar = false, page = 1 }
  ) => {
    if (!id) {
      throw new Error("ID is not provided");
    }

    if (images) {
      const fetchMovieImages = await getReq(`/movie/${id}/images`);

      const modifyMovieImages = fetchMovieImages?.backdrops?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;

        return { ratio, path };
      });

      return modifyMovieImages;
    }

    if (reviews) {
      let movieReviews = await getReq(`/movie/${id}/reviews`, {
        params: { page },
      });

      movieReviews = {
        totalPages: movieReviews.total_pages,
        page: movieReviews.page,
        data: movieReviews.results,
      };
      return movieReviews;
    }

    if (similar) {
      let similarMovie = await getReq(`/movie/${id}/similar`, {
        params: { page },
      });
      similarMovie = {
        page: similarMovie.page,
        data: similarMovie.results,
      };
      return similarMovie;
    }

    throw new Error("Please check you provided arguments");
  }
);

export default fetchMovieAdditional;
