"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TvId = ({ query }) => {
  const router = useRouter();

  useEffect(() => {
    if (query) {
      const route = `/tv/${query.id}/season/${query.seasons}`;
      router.push(route);
    }
  }, [query, router]);

  return;
};

export default TvId;
