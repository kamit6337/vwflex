import { MOVIE, TV } from "@constants/mediaType";
import Link from "next/link";
import { useState } from "react";

const PersonCard = ({ person, fixed }) => {
  const { imageDetail } = fixed;
  const [toggle, setToggle] = useState(false);

  const { id, profile_path, name, known_for, known_for_department } = person;

  if (!profile_path) return;

  const size = imageDetail.profile_sizes.at(-1);
  const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
  const createPhoto = `${createBaseUrl}${profile_path}`;

  return (
    <div
      className={`${
        toggle && "scale-125 tablet:scale-110 z-50 transition-all duration-300"
      } relative grow-0 sm:w-1/4 lg:w-1/6 w-1/3 shrink-0 px-2`}
    >
      <div
        className="relative rounded-xl"
        onMouseLeave={() => setToggle(false)}
      >
        <Link href={`/person?id=${id}`}>
          <div onMouseEnter={() => setToggle(true)} className="cursor-pointer">
            <img
              src={createPhoto}
              alt={name}
              className={`${
                toggle ? "rounded-t-xl" : "rounded-xl"
              } w-full object-cover `}
            />
          </div>
        </Link>

        {toggle && (
          <div className="absolute top-full bg-my_hover w-full p-3 pb-5 transition-all duration-300  rounded-b-xl flex flex-col gap-2">
            <p className="text-sm">
              {name} | {known_for_department}
            </p>

            <div className="">
              <p className="text-[10px] text-gray-300">Known for :</p>
              <p className="text-xs leading-5">
                {known_for?.reduce((acc, curr, i, arr) => {
                  let title = "";

                  if (curr.media_type === MOVIE) {
                    title = curr.title;
                  } else if (curr.media_type === TV) {
                    title = curr.name;
                  }

                  return arr.length - 1 === i
                    ? acc + title
                    : acc + title + ", ";
                }, "")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
