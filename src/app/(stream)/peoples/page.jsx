"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import GetReq from "@utils/client/GetReq";
import { Suspense } from "react";

const Peoples = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["peoplesList"],
    queryFn: () => GetReq("/peoples"),
  });

  return (
    <div>
      <p>Peoples</p>
      <Suspense fallback={<p>SUspense loading.........</p>}>
        {JSON.stringify(data)}
      </Suspense>
    </div>
  );
};

export default Peoples;
