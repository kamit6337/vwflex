import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import serverAxios from "@utils/server/serverAxios";

const TRUE = "true";
const NULL = "null";
const UNDEFINDED = "undefined";

export const GET = async (request) => {
  const { query } = Req(request);

  let { id, season, images, recommendations, similar, page = 1 } = query;

  if (!id) {
    return Res({ error: "Id is not provided" }, { status: 404 });
  }

  try {
    const tv = await serverAxios.get(`/tv/${id}`);

    const { number_of_seasons } = tv;

    if (season === NULL || season === UNDEFINDED) {
      const response = {
        id,
        seasons: number_of_seasons,
      };

      return Res(response);
    }

    const tvSeason = await serverAxios.get(`/tv/${id}/season/${season}`);

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
        season_number: season,
        ...modifyTv,
        ...tvSeason,
      },
    };

    if (images === TRUE) {
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

    if (recommendations === TRUE) {
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

    if (similar === TRUE) {
      const similarTvShow = await serverAxios.get(`/tv/${id}/similar`, {
        params: { page },
      });

      response.similar = {
        page: similarTvShow?.page,
        totalPages: similarTvShow?.total_pages,
        data: similarTvShow?.results,
      };
    }

    return Res(response);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
