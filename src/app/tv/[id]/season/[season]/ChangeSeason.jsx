"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ChangeSeason = ({ season, showId, totalSeasons }) => {
  const [selectSeasonNum, setSelectSeasonNum] = useState(season);
  const router = useRouter();

  const handleSeasonSelect = (e) => {
    const selectedSeason = e.target.value;
    const createRoute = `/tv/${showId}/season/${selectedSeason}`;
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
