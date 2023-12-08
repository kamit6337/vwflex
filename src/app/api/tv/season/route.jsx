import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import fetchReq from "@utils/server/fetchReq";

const TRUE = "true";

export const GET = async (request) => {
  const { query } = Req(request);

  let { id, season = null, images, recommendations, similar, page = 1 } = query;

  if (!id) {
    return Res({ error: "Id is not provided" }, { status: 404 });
  }

  try {
    const tv = await fetchReq(`/tv/${id}`);

    const {
      backdrop_path: backdropPath,
      poster_path: posterPath,
      created_by: createdBy,
      overview,
      tagline,
      genres,
      languages,
      networks,
      number_of_episodes: numberOfEpisodes,
      number_of_seasons: numberOfSeasons,
      origin_country: originCountry,
      original_language: originalLanguage,
      production_companies: productionCompanies,
      production_countries: productionCountries,
      spoken_languages: spokenLanguages,
      vote_average: voteAverage,
    } = tv;

    if (
      !season ||
      !(Number(season) >= 1 && Number(season) <= numberOfSeasons)
    ) {
      season = numberOfSeasons;
    }

    const tvSeason = await fetchReq(`/tv/${id}/season/${season}`);

    const { episodes, name, poster_path: path, air_date: airDate } = tvSeason;

    const response = {
      airDate,
      seasonNum: season,
      backdropPath,
      posterPath,
      overview,
      tagline,
      createdBy,
      genres,
      languages,
      networks,
      numberOfEpisodes,
      numberOfSeasons,
      originCountry,
      originalLanguage,
      productionCompanies,
      productionCountries,
      spokenLanguages,
      voteAverage,
      name,
      episodes,
      path,
    };

    if (images === TRUE) {
      const tvShowImages = await fetchReq(`/tv/${id}/images`);

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
      const recommendationTvShow = await fetchReq(`/tv/${id}/recommendations`, {
        page,
      });

      response.recommendations = {
        page: recommendationTvShow?.page,
        totalPages: recommendationTvShow?.total_pages,
        data: recommendationTvShow?.results,
      };
    }

    if (similar === TRUE) {
      const similarTvShow = await fetchReq(`/tv/${id}/similar`, {
        page,
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
