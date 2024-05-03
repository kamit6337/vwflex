/* eslint-disable @next/next/no-img-element */
import { fixedState } from "@redux/slice/fixedSlice";
import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import OneNumberAfterDecimal from "@utils/javascript/OneNumberAfterDecimal";
import Link from "next/link";
import { useSelector } from "react-redux";

const MovieCard = ({
  i,
  movie,
  mediaIndex,
  resetMediaIndex,
  handleMouseEnter,
  perScreen,
}) => {
  const { imageDetail } = useSelector(fixedState);

  const {
    backdrop_path,
    genre_ids,
    id,
    original_title,
    poster_path,
    release_date,
    overview,
    title,
    vote_average,
  } = movie;

  if (!backdrop_path) return;

  const size = imageDetail.backdrop_sizes[0];
  const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
  const createPhoto = `${createBaseUrl}${backdrop_path}`;

  return (
    <div
      key={i}
      className={`${
        mediaIndex === i && "scale-125 tablet:scale-110  transition-all duration-300 "
      } relative grow-0 shrink-0 px-2`}
      style={{
        zIndex: mediaIndex === i ? 999 : -1,
        flexBasis: `${100 / perScreen}%`,
      }}
    >
      <div className="relative rounded-xl" onMouseLeave={resetMediaIndex}>
        <Link href={`/movie?id=${id}`}>
          <div
            onMouseEnter={() => handleMouseEnter(i, id)}
            className="cursor-pointer"
          >
            <img
              src={createPhoto}
              alt={title}
              className={`${
                mediaIndex === i ? "rounded-t-xl" : "rounded-xl"
              } w-full object-cover `}
            />
          </div>
        </Link>

        {mediaIndex === i && (
          <div
            className="absolute top-full  w-full p-4 transition-all duration-300 rounded-b-xl bg-my_hover flex flex-col gap-2
            "
          >
            <div className="flex justify-between items-center gap-2">
              <p className="">{title}</p>
              {vote_average ? (
                <p className="border text-sm rounded-full p-2">
                  {OneNumberAfterDecimal(vote_average)}
                </p>
              ) : (
                <p className="text-[10px] text-gray-300">Not Rated Yet</p>
              )}
            </div>
            <p className="text-[11px] tracking-wide line-clamp-6 sm_lap:line-clamp-4">
              {overview}
            </p>
            <p className="text-sm">{IndianTypeDate(release_date)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
