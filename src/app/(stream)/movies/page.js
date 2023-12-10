"use client";

import StreamCard from "@components/StreamCard";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import GetReq from "@utils/client/GetReq";
import { Suspense, useState } from "react";

const Movies = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["moviesList"],
    queryFn: () => GetReq("/movies", { all: true }),
    staleTime: 10 * 60 * 1000,
  });

  const [index, setindex] = useState(false);

  const {
    message,
    upcoming: { page, data: upcomingData },
    popular,
  } = data;

  return (
    <div>
      <Suspense fallback={<div className="suspense loading" />}>
        {JSON.stringify(upcomingData)}
      </Suspense>
    </div>
  );

  return (
    <section className="flex flex-col gap-4 bg-slate-400 text-white">
      <div>Movies</div>

      <div className="pl-4">
        <div
          className="flex w-full "
          style={{ transform: index && "translateX(100%)" }}
        >
          <Suspense fallback={<div className="loading" />}>
            {upcomingData.map((obj, i) => {
              return <StreamCard obj={obj} key={i} />;
            })}
          </Suspense>
        </div>
      </div>
      <div className="flex justify-end gap-4 items-center">
        <p className="cursor-pointer">Left</p>
        <p className="cursor-pointer" onClick={() => setindex(true)}>
          Right
        </p>
      </div>
    </section>
  );
};

export default Movies;
