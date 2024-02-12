import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import serverAxios from "@utils/server/serverAxios";

const TRUE = "true";

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

    const movie = await serverAxios.get(`/movie/${id}`);

    response.details = movie;

    if (images === TRUE) {
      const fetchMovieImages = await serverAxios.get(`/movie/${id}/images`);

      const modifyMovieImages = fetchMovieImages?.backdrops?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;

        return { ratio, path };
      });

      response.images = modifyMovieImages;
    }

    if (recommendations === TRUE) {
      const movieRecommendations = await serverAxios.get(
        `/movie/${id}/recommendations`,
        { params: { page } }
      );

      response.recommendations = {
        page: movieRecommendations.page,
        data: movieRecommendations.results,
      };
    }

    if (reviews === TRUE) {
      const movieReviews = await serverAxios.get(`/movie/${id}/reviews`, {
        params: { page },
      });

      response.reviews = {
        page: movieReviews.page,
        data: movieReviews.results,
      };
    }

    if (similar === TRUE) {
      const similarMovie = await serverAxios.get(`/movie/${id}/similar`, {
        params: { page },
      });
      response.similar = {
        page: similarMovie.page,
        data: similarMovie.results,
      };
    }

    if (videos === TRUE) {
      const movieVideos = await serverAxios.get(`/movie/${id}/videos`);

      response.videos = movieVideos.results;
    }

    return Res(response);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
