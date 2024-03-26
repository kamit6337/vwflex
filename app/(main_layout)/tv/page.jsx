import fetchTvShowDetails from "@api/query/tv/fetchTvShowDetails";
import { Icons } from "@assets/icons";
import ChangeSeason from "./ChangeSeason";
import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import Additional from "./Additional";
import ImageOfDetail from "@components/ImageOfDetail";
import WatchlistPart from "./WatchlistPart";
import OneNumberAfterDecimal from "@utils/javascript/OneNumberAfterDecimal";

const TvDetailPage = async ({ searchParams: { id, season = null } }) => {
  const query = await fetchTvShowDetails(id, season);
  if (!query) return;

  const { details } = query;

  const {
    season_number,
    created_by,
    adult,
    first_air_date,
    genres,
    last_air_date,
    name,
    original_name,
    number_of_episodes,
    number_of_seasons,
    overview,
    production_companies,
    production_countries,
    spoken_languages,
    vote_average,
    backdrop_path,
    poster_path,
    episodes,
    air_date,
  } = details;

  return (
    <section className="flex flex-col w-full">
      {/* UPPER 100vh DIV */}
      <div
        className="relative  w-full flex flex-col items-center justify-center"
        style={{ height: `calc(100vh - 56px)` }}
      >
        {/* IMAGE DIV */}
        <div className="h-full  image_shadow self-end">
          <ImageOfDetail backdrop_path={backdrop_path} title={name} />
        </div>

        {/* TV BRIEF DETAIL */}
        <div className="absolute left-0 ml-16 mt-10 flex flex-col items-start justify-end gap-0">
          <div className="flex flex-col items-start mb-4">
            <p className="text-5xl font-extrabold tracking-wide leading-snug sm:text-3xl sm:font-semibold">
              {original_name}
            </p>
            <div className="w-full h-[2px] mt-1 bg-white/70" />
          </div>

          <div className="rounded-2xl mb-4">
            <ChangeSeason
              totalSeasons={number_of_seasons}
              showId={id}
              season={season_number}
            />
          </div>

          <div className="flex justify-start items-center gap-4">
            <p>IMDb {OneNumberAfterDecimal(vote_average)}</p>
            <p>{adult ? "Adult" : "Universal"}</p>
            <p>{episodes.length} episodes</p>
          </div>
          <div className="flex items-center gap-2 my-1">
            {genres.map((genre, i) => (
              <p key={i}>{genre.name}</p>
            ))}
          </div>
          <div className="flex flex-col justify-between items-start ">
            <div className="flex items-center gap-2 text-sm">
              <p className="font-medium ">Air Date :</p>
              <p>{IndianTypeDate(air_date)}</p>
            </div>
          </div>

          <div className="mt-2">
            <WatchlistPart id={id} season={season} />
          </div>
        </div>
      </div>

      <Additional id={id} season={season} details={details} />
    </section>
  );
};

export default TvDetailPage;
