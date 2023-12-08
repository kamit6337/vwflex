import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import fetchReq from "@utils/server/fetchReq";

const DAY = "day";
const WEEK = "week";
const TRUE = "true";

export const GET = async (request) => {
  const { query } = Req(request);

  const { movies, tv, peoples, all, time = DAY } = query;

  if (time !== DAY && time !== WEEK) {
    return Res({ error: "Error in time-period" }, { status: 404 });
  }

  try {
    if (movies === TRUE) {
      const trendingMovies = await fetchReq(`/trending/movie/${time}`);

      const response = {
        message: "Trending Movie",
        data: trendingMovies?.results,
      };
      return Res(response);
    }

    if (tv === TRUE) {
      const trendingtv = await fetchReq(`/trending/tv/${time}`);

      const response = {
        message: "Trending TV Shows",
        data: trendingtv?.results,
      };
      return Res(response);
    }

    if (peoples === TRUE) {
      const trendingPeoples = await fetchReq(`/trending/person/${time}`);

      const response = {
        message: "Trending Peopless",
        data: trendingPeoples?.results,
      };
      return Res(response);
    }

    if (all === TRUE) {
      const [trendMovies, trendTv, trendPeoples] = await Promise.all([
        fetchReq(`/trending/movie/${time}`),
        fetchReq(`/trending/tv/${time}`),
        fetchReq(`/trending/person/${time}`),
      ]);

      const response = {
        message: "Trending All",
        movies: trendMovies?.results,
        tv: trendTv?.results,
        peoples: trendPeoples?.results,
      };

      return Res(response);
    }

    return Res({ error: "Error in  query" }, { status: 404 });
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
