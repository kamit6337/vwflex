import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import inHourAndMin from "@utils/javascript/inHourAndMin";
import OneNumberAfterDecimal from "@utils/javascript/OneNumberAfterDecimal";
import movieDetailSchema, {
  getMovieDetailDataQuery,
} from "@graphql/movie/movieDetailSchema";
import recommendationSchema, {
  getMovieRecommendationsDataQuery,
} from "@graphql/movie/recommendationSchema";
import Additional from "./Additional";
import cachedQuery from "@graphql/query/cachedQuery";
import getFixedData from "@graphql/fixed/query";
import WatchlistPart from "./WatchlistPart";

export const generateMetadata = async ({ searchParams: { id } }) => {
  const { data } = await cachedQuery(
    movieDetailSchema,
    getMovieDetailDataQuery,
    {
      id,
    }
  );

  return {
    title: data?.title,
    description: data?.overview,
  };
};

const MovieDetailPage = async ({ searchParams: { id } }) => {
  const { data: fixed } = await getFixedData();

  const { data: movieDetails, error: movieDetailsError } = await cachedQuery(
    movieDetailSchema,
    getMovieDetailDataQuery,
    { id }
  );

  const { data: recommendations, error: movieRecommendationsError } =
    await cachedQuery(recommendationSchema, getMovieRecommendationsDataQuery, {
      id,
      page: 1,
    });

  if (movieDetailsError || movieRecommendationsError) {
    throw new Error(
      movieDetailsError?.message || movieRecommendationsError?.message
    );
  }

  const details = movieDetails;

  const {
    adult,
    title,
    backdrop_path,
    release_date,
    vote_average,
    runtime,
    genres,
  } = details;

  const { imageDetail } = fixed;

  const createPhoto = `${imageDetail.secure_base_url}original${backdrop_path}`;

  return (
    <section className="flex flex-col w-full ">
      {/* UPPER 100vh DIV */}
      <div
        className="relative w-full flex flex-col items-center justify-center"
        style={{ height: `calc(100vh - 56px)` }}
      >
        {/* IMAGE DIV */}
        <div className="h-full image_shadow self-end">
          <img
            src={createPhoto}
            alt={title}
            className="h-full rounded-xl object-cover"
          />
        </div>

        {/* MOVIE BRIEF DETAIL */}
        <div className="absolute left-0 ml-16 sm_lap:ml-10 tablet:ml-4 mt-10 flex flex-col items-start justify-end">
          <div className="flex flex-col items-start gap-0  w-[450px] tablet:w-80 sm_lap:w-96  ">
            <p className="text-5xl font-extrabold tracking-wide leading-snug sm_lap:text-4xl  tablet:text-3xl">
              {title}
            </p>
            <div className="w-full h-[2px] mt-1 bg-white/70" />
          </div>
          <div className="flex justify-start items-center gap-4 mt-8 mb-1 tablet:text-sm">
            <p>IMDb {OneNumberAfterDecimal(vote_average)}</p>
            <p>{IndianTypeDate(release_date)}</p>
            <p>{inHourAndMin(runtime)}</p>
            <p>{adult ? "Adult" : "Universal"}</p>
          </div>
          <div className="flex justify-start gap-4 tablet:text-sm">
            {genres.map((genre, i) => (
              <p key={i}>{genre.name}</p>
            ))}
          </div>
          <div className="mt-2">
            <WatchlistPart key={id} details={details} id={id} />
          </div>
        </div>
      </div>

      <Additional
        id={id}
        details={details}
        recommendations={recommendations}
        fixed={fixed}
      />
    </section>
  );
};

export default MovieDetailPage;
