"use client";

import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const Tv = () => {
  const { data } = useQuery({
    queryKey: ["tvList"],
    queryFn: () => GetReq("/tv", { popular: true }),
    staleTime: 240000,
  });

  return (
    <div>
      <p>Tv List Data</p>
      <Suspense fallback={<div className="loading" />}>
        {JSON.stringify(data)}
      </Suspense>
    </div>
  );
};

export default Tv;
