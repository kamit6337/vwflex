"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const Tv = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["tvList"],
    queryFn: () => GetReq("/tv", { popular: true }),
    staleTime: 240000,
  });

  return (
    <div>
      <p>Tv List Data</p>
      <Suspense fallback={<div className="suspense loading" />}>
        {JSON.stringify(data)}
      </Suspense>
    </div>
  );
};

export default Tv;
