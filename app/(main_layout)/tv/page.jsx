import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import OneNumberAfterDecimal from "@utils/javascript/OneNumberAfterDecimal";
import tvDetailSchema, {
  getTvShowDetailDataQuery,
} from "@graphql/tv/tvDetailSchema";
import tvSeasonSchema, {
  getTvShowSeasonDetailDataQuery,
} from "@graphql/tv/tvSeasonSchema";
import ChangeSeason from "./ChangeSeason";
import Additional from "./Additional";
import cachedQuery from "@graphql/query/cachedQuery";
import getFixedData from "@graphql/fixed/query";
import WatchlistPart from "./WatchlistPart";

export const generateMetadata = async ({ searchParams: { id } }) => {
  const { data } = await cachedQuery(tvDetailSchema, getTvShowDetailDataQuery, {
    id,
  });

  return {
    title: data?.name,
    description: data?.overview,
  };
};

const TvDetailPage = async ({ searchParams: { id, season } }) => {
  const { data: fixed } = await getFixedData();

  const { data: tvShowDetail, error: tvShowDetailError } = await cachedQuery(
    tvDetailSchema,
    getTvShowDetailDataQuery,
    {
      id,
    }
  );

  const { data: tvShowSeasonDetail, error: tvShowSeasonDetailError } =
    await cachedQuery(tvSeasonSchema, getTvShowSeasonDetailDataQuery, {
      id,
      season,
    });

  if (tvShowDetailError || tvShowSeasonDetailError) {
    throw new Error(
      tvShowDetailError?.message || tvShowSeasonDetailError?.message
    );
  }

  const details = tvShowDetail;
  const episodes = tvShowSeasonDetail?.episodes;

  const {
    adult,
    genres,
    name,
    original_name,
    number_of_seasons,
    vote_average,
    backdrop_path,
    number_of_episodes,
    first_air_date,
  } = details;

  const { imageDetail } = fixed;

  const createPhoto = `${imageDetail.secure_base_url}original${backdrop_path}`;

  return (
    <section className="flex flex-col w-full">
      {/* UPPER 100vh DIV */}
      <div
        className="relative  w-full flex flex-col items-center justify-center"
        style={{ height: `calc(100vh - 56px)` }}
      >
        {/* IMAGE DIV */}
        <div className="h-full image_shadow self-end">
          <img
            src={createPhoto}
            alt={name}
            className="h-full rounded-xl object-cover"
          />
        </div>

        {/* TV BRIEF DETAIL */}
        <div className="absolute left-0 ml-16 sm_lap:ml-10 tablet:ml-4 mt-10 flex flex-col items-start justify-end">
          <div className="flex flex-col items-start mb-4">
            <p className="text-5xl font-extrabold tracking-wide leading-snug sm_lap:text-4xl  tablet:text-3xl">
              {name}
            </p>
            <div className="w-full h-[2px] mt-1 bg-white/70" />
          </div>

          <div className="mb-4">
            <ChangeSeason
              key={id}
              totalSeasons={number_of_seasons}
              showId={id}
              season={season}
            />
          </div>

          <div className="flex justify-start items-center gap-4 tablet:text-sm">
            <p>IMDb {OneNumberAfterDecimal(vote_average)}</p>
            <p>{adult ? "Adult" : "Universal"}</p>
            <p>{number_of_episodes} episodes</p>
          </div>
          <div className="flex items-center gap-2 my-1 tablet:text-sm">
            {genres.map((genre, i) => (
              <p key={i}>{genre.name}</p>
            ))}
          </div>
          <div className="flex flex-col justify-between items-start ">
            <div className="flex items-center gap-2 text-sm">
              <p className="font-medium ">Air Date :</p>
              <p>{IndianTypeDate(first_air_date)}</p>
            </div>
          </div>
          <div className="mt-2">
            <WatchlistPart
              key={`${id}-${season}`}
              id={id}
              season={season}
              details={tvShowSeasonDetail}
            />
          </div>
        </div>
      </div>

      <Additional
        id={id}
        season={season}
        details={details}
        fixed={fixed}
        episodes={episodes}
      />
    </section>
  );
};

export default TvDetailPage;
