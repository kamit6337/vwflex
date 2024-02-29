"use server";

import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const fetchMovieDetail = catchAsyncError(
  async (
    id,
    {
      images = true,
      recommendations = true,
      reviews = true,
      similar = true,
      page = 1,
    } = {}
  ) => {
    const response = {};

    const movie = await serverAxios.get(`/movie/${id}`);

    response.details = movie;

    if (images) {
      const fetchMovieImages = await serverAxios.get(`/movie/${id}/images`);

      const modifyMovieImages = fetchMovieImages?.backdrops?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;

        return { ratio, path };
      });

      response.images = modifyMovieImages;
    }

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

    if (reviews) {
      const movieReviews = await serverAxios.get(`/movie/${id}/reviews`, {
        params: { page },
      });

      response.reviews = {
        page: movieReviews.page,
        data: movieReviews.results,
      };
    }

    if (similar) {
      const similarMovie = await serverAxios.get(`/movie/${id}/similar`, {
        params: { page },
      });
      response.similar = {
        page: similarMovie.page,
        data: similarMovie.results,
      };
    }

    // if (videos) {
    //   const movieVideos = await serverAxios.get(`/movie/${id}/videos`);

    //   response.videos = movieVideos.results;
    // }

    return response;
  }
);

export default fetchMovieDetail;
