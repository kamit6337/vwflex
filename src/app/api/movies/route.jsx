import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import fetchReq from "@utils/server/fetchReq";

export const GET = async (request) => {
  const { query } = Req(request);

  const { upcoming, popular, topRated, nowPlaying, page = 1 } = query;

  try {
    // WORK: IF UPCOMING IS TRUE THEN ONLY UPCOMING MOVIES WILL SEND
    if (upcoming) {
      const upcomingMovies = await fetchReq("/movie/upcoming", { page });

      const res = {
        page: upcomingMovies.page,
        data: upcomingMovies.results,
        message: "Upcoming Movies list",
      };

      return Res(res);
    }

    // WORK: IF POPULAR IS TRUE THEN ONLY POPULAR MOVIES WILL SEND

    if (popular) {
      const popularMovies = await fetchReq("/movie/popular", { page });

      const res = {
        page: popularMovies.page,
        data: popularMovies.results,
        message: "Popular Movies list",
      };

      return Res(res);
    }

    // WORK: IF TOP-RATED IS TRUE THEN ONLY TOP-RATED MOVIES WILL SEND

    if (topRated) {
      const topRatedMovies = await fetchReq("/movie/top_rated", { page });

      const res = {
        page: topRatedMovies.page,
        data: topRatedMovies.results,
        message: "Top-Rated Movies list",
      };

      return Res(res);
    }

    // WORK: IF NOW-PLAYING IS TRUE THEN ONLY NOW-PLAYING MOVIES WILL SEND

    if (nowPlaying) {
      const nowPlayingMovies = await fetchReq("/movie/now_playing", {
        page,
      });

      const res = {
        page: nowPlayingMovies.page,
        data: nowPlayingMovies.results,
        message: "Now-Playing Movies list",
      };

      return Res(res);
    }

    // WORK: IF QUERY IS NOT PROVIDED THEN ALL MOVIES LIST WILL SEND

    const [fetchUpcoming, fetchPopular, fetchTopRated, fetchNowPlaying] =
      await Promise.all([
        fetchReq("/movie/upcoming"),
        fetchReq("/movie/popular"),
        fetchReq("/movie/top_rated"),
        fetchReq("/movie/now_playing"),
      ]);

    const res = {
      message: "All Movies List",
      upcoming: {
        page: fetchUpcoming.page,
        data: fetchUpcoming.results,
      },
      popular: {
        page: fetchPopular.page,
        data: fetchPopular.results,
      },
      topRated: {
        page: fetchTopRated.page,
        data: fetchTopRated.results,
      },
      nowPlaying: {
        page: fetchNowPlaying.page,
        data: fetchNowPlaying.results,
      },
    };
    return Res(res);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
