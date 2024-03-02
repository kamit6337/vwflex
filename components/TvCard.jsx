/* eslint-disable @next/next/no-img-element */
import { fixedState } from "@redux/slice/fixedSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

const TvCard = ({ i, tv, mediaIndex, resetMediaIndex, handleMouseEnter }) => {
  const { imageDetail } = useSelector(fixedState);

  const {
    backdrop_path,
    genre_ids,
    id,
    original_name,
    poster_path,
    first_air_date,
    name,
    vote_average,
  } = tv;

  if (!backdrop_path) return;
  const size = imageDetail.backdrop_sizes[0];
  const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
  const createPhoto = `${createBaseUrl}${backdrop_path}`;

  return (
    <div
      key={i}
      className={`${
        mediaIndex === i && "scale-125  transition-all duration-300"
      } relative grow-0 shrink-0 basis-1/4  px-2`}
      style={{ zIndex: mediaIndex === i ? 999 : -1 }}
    >
      <div className="relative rounded-xl" onMouseLeave={resetMediaIndex}>
        <Link href={`/tv?id=${id}`}>
          <div
            onMouseEnter={() => handleMouseEnter(i, id)}
            className="cursor-pointer"
          >
            <img
              src={createPhoto}
              alt={name}
              className={`${
                mediaIndex === i ? "rounded-t-xl" : "rounded-xl"
              } w-full object-cover `}
            />
          </div>
        </Link>

        {mediaIndex === i && (
          <div className="absolute top-full  w-full p-4 transition-all duration-300 bg-my_hover rounded-b-xl ">
            <p>{name}</p>
            <p>{vote_average}</p>
            <p>{first_air_date}</p>
            <p>{original_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TvCard;
