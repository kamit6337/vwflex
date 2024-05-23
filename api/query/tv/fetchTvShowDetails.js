"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const fetchTvShowDetails = catchAsyncError(async (id, season = null) => {
  const tv = await getReq(`/tv/${id}`);
  const { number_of_seasons } = tv;

  let currentSeason;
  if (!season) {
    currentSeason = number_of_seasons;
  } else {
    currentSeason = season;
  }

  const tvSeason = await getReq(`/tv/${id}/season/${currentSeason}`);

  const modifyTv = { ...tv };

  const listToDelete = [
    "episode_run_time",
    "in_production",
    "last_episode_to_air",
    "overview",
    "poster_path",
    "seasons",
    "tagline",
    "vote_average",
  ];

  listToDelete.forEach((item) => {
    delete modifyTv[item];
  });

  const response = {
    details: {
      tvId: id,
      season_number: season,
      ...modifyTv,
      ...tvSeason,
    },
  };

  return response;
});

export default fetchTvShowDetails;
