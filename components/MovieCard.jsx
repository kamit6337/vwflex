import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import OneNumberAfterDecimal from "@utils/javascript/OneNumberAfterDecimal";
import Link from "next/link";
import { useState } from "react";

const MovieCard = ({ movie, fixed }) => {
  const { imageDetail } = fixed;
  const [toggle, setToggle] = useState(false);

  const { backdrop_path, id, release_date, overview, title, vote_average } =
    movie;

  if (!backdrop_path) return;

  const createPhoto = `${imageDetail.secure_base_url}w300${backdrop_path}`;

  return (
    <div
      className={`${
        toggle && "scale-125 tablet:scale-110 z-50 transition-all duration-300 "
      } relative grow-0 sm:w-1/3 lg:w-1/4 w-1/2 shrink-0 px-2`}
    >
      <div
        className="relative rounded-xl"
        onMouseLeave={() => setToggle(false)}
      >
        <Link href={`/movie?id=${id}`}>
          <div onMouseEnter={() => setToggle(true)} className="cursor-pointer">
            <img
              src={createPhoto}
              alt={title}
              className={`${
                toggle ? "rounded-t-xl" : "rounded-xl"
              } w-full object-cover `}
            />
          </div>
        </Link>

        {toggle && (
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
