/* eslint-disable @next/next/no-img-element */
import fetchTvShowDetails from "@api/query/tv/fetchTvShowDetails";
import { fixed } from "@api/query/initialFetch";
import { Icons } from "@assets/icons";
import ChangeSeason from "./ChangeSeason";
import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import Additional from "./Additional";

const page = async ({ params: { id, season } }) => {
  const fixedQuery = await fixed();
  const query = await fetchTvShowDetails(id, season);
  if (!query) return;

  const { details, images, recommendations, similar } = query;

  const {
    season_number,
    created_by,
    adult,
    first_air_date,
    genres,
    last_air_date,
    name,
    number_of_episodes,
    number_of_seasons,
    overview,
    production_companies,
    production_countries,
    spoken_languages,
    vote_average,
    backdrop_path,
    poster_path,
  } = details;

  const size = fixedQuery.imageDetail.backdrop_sizes.at(-1);
  const createBaseUrl = `${fixedQuery.imageDetail.secure_base_url}${size}`;
  const createPhoto = `${createBaseUrl}${backdrop_path}`;

  return (
    <section className="flex flex-col w-full">
      {/* UPPER 100vh DIV */}
      <div
        className="relative  w-full flex flex-col items-center justify-center"
        style={{ height: `calc(100vh - 56px)` }}
      >
        {/* IMAGE DIV */}
        <div className="h-full  image_shadow self-end">
          <img src={createPhoto} alt="img" className="h-full  object-cover" />
        </div>

        {/* TV BRIEF DETAIL */}
        <div className="absolute left-0 ml-16 mt-10 flex flex-col items-start justify-end gap-0">
          <div className="flex flex-col items-start mb-4">
            <p className="text-5xl font-extrabold tracking-wide leading-snug sm:text-3xl sm:font-semibold">
              {name}
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
            {genres.map((genre, i) => (
              <p key={i}>{genre.name}</p>
            ))}
            <p>IMDb {parseFloat(vote_average.toFixed(1))}</p>
            <p>{adult ? "Adult" : "Universal"}</p>
          </div>
          <div className="flex flex-col justify-between items-start ">
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium ">First Air :</p>
              <p>{IndianTypeDate(first_air_date)}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium ">Last Air :</p>
              <p>{IndianTypeDate(last_air_date)}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            {number_of_seasons && <p>Total Seasons : {number_of_seasons}</p>}
            {number_of_episodes && <p>Total Episodes : {number_of_episodes}</p>}
          </div>

          <div className="mt-2">
            <div
              className={`border-2 relative border-white rounded-3xl sm:rounded-full p-3 cursor-pointer `}
            >
              <Icons.plus className="text-3xl" />
            </div>
          </div>
        </div>
      </div>

      <Additional
        details={details}
        recommendations={recommendations}
        similar={similar}
        images={images}
        fixed={fixedQuery}
      />
    </section>
  );
};

export default page;
