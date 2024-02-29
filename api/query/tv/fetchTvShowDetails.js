"use server";
import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

const fetchTvShowDetails = catchAsyncError(
  async (
    id,
    season = null,
    { images = true, recommendations = true, similar = true, page = 1 } = {}
  ) => {
    const tv = await serverAxios.get(`/tv/${id}`);
    const { number_of_seasons } = tv;

    let currentSeason;
    if (!season) {
      currentSeason = number_of_seasons;
    } else {
      currentSeason = season;
    }

    const tvSeason = await serverAxios.get(`/tv/${id}/season/${currentSeason}`);

    const modifyTv = { ...tv };

    const listToDelete = [
      "episode_run_time",
      "in_production",
      "last_episode_to_air",
      "overview",
      "poster_path",
      "seasons",
      "tagline",
      "vote_average",
    ];

    listToDelete.forEach((item) => {
      delete modifyTv[item];
    });

    const response = {
      details: {
        tvId: id,
        season_number: season,
        ...modifyTv,
        ...tvSeason,
      },
    };

    if (images) {
      const tvShowImages = await serverAxios.get(`/tv/${id}/images`);

      const imageList = [
        ...tvShowImages?.backdrops,
        ...tvShowImages?.posters,
      ]?.map((obj) => {
        const { aspect_ratio: ratio, file_path: path } = obj;

        return { ratio, path };
      });

      response.images = imageList;
    }

    if (recommendations) {
      const recommendationTvShow = await serverAxios.get(
        `/tv/${id}/recommendations`,
        {
          params: { page },
        }
      );

      response.recommendations = {
        page: recommendationTvShow?.page,
        totalPages: recommendationTvShow?.total_pages,
        data: recommendationTvShow?.results,
      };
    }

    if (similar) {
      const similarTvShow = await serverAxios.get(`/tv/${id}/similar`, {
        params: { page },
      });

      response.similar = {
        page: similarTvShow?.page,
        totalPages: similarTvShow?.total_pages,
        data: similarTvShow?.results,
      };
    }

    return response;
  }
);

export default fetchTvShowDetails;
