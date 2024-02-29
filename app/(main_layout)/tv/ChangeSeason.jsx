"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChangeSeason = ({ season, showId, totalSeasons }) => {
  const router = useRouter();

  useEffect(() => {
    const createRoute = `/tv?id=${showId}&season=${season}`;
    router.push(createRoute);
  }, [showId, router, season]);

  const handleSeasonSelect = (e) => {
    const selectedSeason = e.target.value;
    const createRoute = `/tv?id=${showId}&season=${selectedSeason}`;
    router.push(createRoute);
  };

  return (
    <select
      value={season}
      className="text-black text-lg sm:text-base sm:p-2 font-medium tracking-wide p-4 rounded-2xl"
      onChange={handleSeasonSelect}
    >
      {Array.from({ length: totalSeasons }).map((num, i) => {
        return (
          <option key={i} value={i + 1} className=" bg-black text-white">
            Season {i + 1}
          </option>
        );
      })}
    </select>
  );
};

export default ChangeSeason;
