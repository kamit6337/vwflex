"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const MoviesGridList = ({ title, data, fixed, promise }) => {
  const [movieData, setMovieData] = useState(() => {
    return data?.data.filter((movie) => movie.backdrop_path);
  });
  const [movieIndex, setMovieIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);

      const fetchInitialQuery = async () => {
        const query = await promise(page + 1);
        const filter = query.data.filter((movie) => movie.backdrop_path);
        setMovieData((prev) => [...prev, ...filter]);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      };

      fetchInitialQuery();
    }
  }, [inView, promise, isLoading, page]);

  console.log("movie index", movieIndex);

  return (
    <section className="flex flex-col gap-4 relative pt-5 pb-16 mx-10">
      <p className="ml-5 text-xl font-semibold tracking-wider">{title}</p>

      <div className="grid grid-cols-4 gap-y-8">
        {movieData?.length > 0 &&
          movieData.map((movie, i) => {
            const {
              backdrop_path,
              genre_ids,
              id,
              original_title,
              poster_path,
              release_date,
              title,
              vote_average,
            } = movie;

            if (!backdrop_path) return;

            const createPhoto = `${fixed.imageUrl}${backdrop_path}`;

            return (
              <div
                key={i}
                className={`${
                  movieIndex === i &&
                  "scale-125 z-50  transition-all duration-300"
                } relative px-2`}
              >
                <div
                  className="relative rounded-xl"
                  onMouseLeave={() => setMovieIndex(null)}
                >
                  <div onMouseEnter={() => setMovieIndex(i)}>
                    <img
                      src={createPhoto}
                      alt={title}
                      className={`${
                        movieIndex === i ? "rounded-t-xl" : "rounded-xl"
                      } w-full object-cover `}
                    />
                  </div>

                  {movieIndex === i && (
                    <div className="absolute top-full  w-full p-4 transition-all duration-300 bg-my_bg rounded-b-xl">
                      <p>{title}</p>
                      <p>{vote_average}</p>
                      <p>{release_date}</p>
                      <p>{original_title}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {isLoading && (
        <div className="w-full h-48 flex justify-center items-center">
          <div className="loading" />
        </div>
      )}
      <div className="w-full h-10" ref={ref} />
    </section>
  );
};

export default MoviesGridList;
