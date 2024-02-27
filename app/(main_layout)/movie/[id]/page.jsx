/* eslint-disable @next/next/no-img-element */
import { fixed } from "@api/query/initialFetch";
import fetchMovieDetail from "@api/query/movie/fetchMovieDetail";
import { Icons } from "@assets/icons";
import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import inHourAndMin from "@utils/javascript/inHourAndMin";
import Additional from "./Additional";

const MovieDetailPage = async ({ params: { id } }) => {
  const fixedQuery = await fixed();
  const query = await fetchMovieDetail(Number(id));
  
  if (!query) return;

  const { details, images, recommendations, reviews, similar } = query;

  const {
    adult,
    title,
    backdrop_path,
    overview,
    release_date,
    vote_average,
    runtime,
    genres,
  } = details;

  const size = fixedQuery.imageDetail.backdrop_sizes.at(-1);
  const createBaseUrl = `${fixedQuery.imageDetail.secure_base_url}${size}`;
  const createPhoto = `${createBaseUrl}${backdrop_path}`;

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
        <div className="absolute left-0 ml-16 mt-10 flex flex-col items-start justify-end gap-0">
          <div className="flex flex-col items-start gap-0 sm:gap-0 w-[550px] sm:w-80 ">
            <p className="text-5xl font-extrabold tracking-wide leading-snug sm:text-3xl sm:font-semibold">
              {title}
            </p>
            <div className="w-full h-[2px] mt-1 bg-white/70" />
          </div>
          <div className="flex justify-start items-center gap-4 mt-8 mb-1 sm:gap-2">
            <p>IMDb {parseFloat(vote_average.toFixed(1))}</p>
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
            <div
              className={`border-2 relative border-white rounded-3xl sm:rounded-full p-3 cursor-pointer`}
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
        reviews={reviews}
        images={images}
        fixed={fixedQuery}
      />
    </section>
  );
};

export default MovieDetailPage;
