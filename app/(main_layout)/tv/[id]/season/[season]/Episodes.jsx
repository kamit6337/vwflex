import { useEffect, useRef, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const Episodes = ({ data, fixed }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.clientWidth;

      const divHeight = width * (169 / 300);

      console.log("divHeight", divHeight);
    }
  }, []);

  return (
    <>
      {data.map((episode, i) => {
        const {
          air_date,
          name,
          overview,
          runtime,
          still_path,
          season_number,
          episode_number,
        } = episode;

        const size = fixed.imageDetail.backdrop_sizes[0];
        const createBaseUrl = `${fixed.imageDetail.secure_base_url}${size}`;
        const createPhoto = `${createBaseUrl}${still_path}`;

        return (
          <section key={i} className="w-full flex gap-5">
            <div className="w-1/4 " ref={ref} style={{ height: `${height}px` }}>
              {still_path ? (
                <img
                  src={createPhoto}
                  alt={name}
                  className="w-full h-full rounded-xl"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-start">
                  <p className="border border-slate-500 p-3">
                    No Image Available
                  </p>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col items-start w-full mt-1 gap-2 ">
              <div className="flex  gap-2 font-semibold text-xl">
                <p>S{season_number} </p>
                <p>E{episode_number}</p>
                <p className="mx-2">-</p>
                <p>{name}</p>
              </div>
              <div className="flex gap-6 text-gray-400">
                <p>{air_date}</p>
                <p>{runtime} min</p>
              </div>

              <div className="text-gray-400">{overview}</div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Episodes;
