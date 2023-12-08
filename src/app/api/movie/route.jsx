import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import fetchReq from "@utils/server/fetchReq";

const TRUE = "true";
const FALSE = "false";

export const GET = async (request) => {
  const { query } = Req(request);

  const {
    id,
    images,
    recommendations,
    reviews,
    similar,
    videos,
    page = 1,
  } = query;

  if (!id) {
    return Res({ error: "Id is not present" }, { status: 404 });
  }

  try {
    const response = {};

    const movie = await fetchReq(`/movie/${id}`);

    response.details = movie;

    if (images === TRUE) {
      const fetchMovieImages = await fetchReq(`/movie/${id}/images`);

      const modifyMovieImages = fetchMovieImages?.backdrops?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;

        return { ratio, path };
      });

      response.images = modifyMovieImages;
    }

    if (recommendations === TRUE) {
      const movieRecommendations = await fetchReq(
        `/movie/${id}/recommendations`,
        { page }
      );

      response.recommendations = {
        page: movieRecommendations.page,
        data: movieRecommendations.results,
      };
    }

    if (reviews === TRUE) {
      const movieReviews = await fetchReq(`/movie/${id}/reviews`, { page });

      response.reviews = {
        page: movieReviews.page,
        data: movieReviews.results,
      };
    }

    if (similar === TRUE) {
      const similarMovie = await fetchReq(`/movie/${id}/similar`, { page });
      response.similar = {
        page: similarMovie.page,
        data: similarMovie.results,
      };
    }

    if (videos === TRUE) {
      const movieVideos = await fetchReq(`/movie/${id}/videos`);

      response.videos = movieVideos.results;
    }

    return Res(response);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
