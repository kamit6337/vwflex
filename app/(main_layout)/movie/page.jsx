import fetchMovieDetail from "@api/query/movie/fetchMovieDetail";
import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import inHourAndMin from "@utils/javascript/inHourAndMin";
import Additional from "./Additional";
import WatchlistPart from "./WatchlistPart";
import ImageOfDetail from "@components/ImageOfDetail";
import OneNumberAfterDecimal from "@utils/javascript/OneNumberAfterDecimal";

const MovieDetailPage = async ({ searchParams: { id } }) => {
  const query = await fetchMovieDetail(Number(id));

  if (!query) {
    throw new Error("Issue in getting movie detail");
  }

  const { details, recommendations } = query;

  const {
    adult,
    title,
    backdrop_path,
    release_date,
    vote_average,
    runtime,
    genres,
  } = details;

  return (
    <section className="flex flex-col w-full ">
      {/* UPPER 100vh DIV */}
      <div
        className="relative w-full flex flex-col items-center justify-center"
        style={{ height: `calc(100vh - 56px)` }}
      >
        {/* IMAGE DIV */}
        <div className="h-full image_shadow self-end">
          <ImageOfDetail backdrop_path={backdrop_path} title={title} />
        </div>

        {/* MOVIE BRIEF DETAIL */}
        <div className="absolute left-0 ml-16 mt-10 flex flex-col items-start justify-end gap-0">
          <div className="flex flex-col items-start gap-0  w-[450px]  ">
            <p className="text-5xl font-extrabold tracking-wide leading-snug ">
              {title}
            </p>
            <div className="w-full h-[2px] mt-1 bg-white/70" />
          </div>
          <div className="flex justify-start items-center gap-4 mt-8 mb-1 sm:gap-2">
            <p>IMDb {OneNumberAfterDecimal(vote_average)}</p>
            <p>{IndianTypeDate(release_date)}</p>
            <p>{inHourAndMin(runtime)}</p>
            <p>{adult ? "Adult" : "Universal"}</p>
          </div>
          <div className="flex justify-start gap-4 sm:gap-2">
            {genres.map((genre, i) => (
              <p key={i}>{genre.name}</p>
            ))}
          </div>
          <div className="mt-2">
            <WatchlistPart id={id} />
          </div>
        </div>
      </div>

      <Additional id={id} details={details} recommendations={recommendations} />
    </section>
  );
};

export default MovieDetailPage;
