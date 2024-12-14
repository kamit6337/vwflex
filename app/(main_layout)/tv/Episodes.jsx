import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import { useEffect, useRef, useState } from "react";

const Episodes = ({ episodes, fixed }) => {
  const { imageDetail } = fixed;
  const ref = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        const divHeight = width * (169 / 300);
        setHeight(divHeight);
      }
    };

    // Initial call to handleResize
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {episodes.map((episode, i) => {
        const {
          air_date,
          name,
          overview,
          runtime,
          still_path,
          season_number,
          episode_number,
        } = episode;

        const size = imageDetail.backdrop_sizes[0];
        const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
        const createPhoto = `${createBaseUrl}${still_path}`;

        return (
          <section key={i} className="w-full flex gap-5">
            <div className="w-1/2 sm:w-1/3 lg:w-1/4">
              {still_path ? (
                <img
                  src={createPhoto}
                  alt={name}
                  className="w-full object-cover rounded-xl"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-32 flex justify-center items-start">
                  <p className="border border-slate-500 p-3 mobile:text-xs ">
                    No Image Available
                  </p>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2 mobile:gap-1 items-start w-full mt-1  mobile:mt-0">
              <div className="flex gap-2 font-semibold text-xl tablet:text-base">
                <p>S{season_number} </p>
                <p>E{episode_number}</p>
                <p className="mx-2">-</p>
                <p>{name}</p>
              </div>
              <div className="flex gap-6 text-gray-400 tablet:text-sm">
                <p>{IndianTypeDate(air_date)}</p>
                <p>{runtime} min</p>
              </div>

              <div className="text-gray-400 sm_lap:text-sm tablet:text-xs">
                {overview}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Episodes;
