import findSmallestNumber from "@utils/javascript/findSmallestNumber";
import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import serverAxios from "@utils/server/serverAxios";

const TRUE = "true";

export const GET = async (request) => {
  const { query } = Req(request);

  const { airingToday, onTheAir, popular, topRated, all, page = 1 } = query;

  if (!query) {
    return Res({ error: "Query is not provided" }, { status: 404 });
  }

  try {
    if (airingToday === TRUE) {
      const tv = await serverAxios.get("/tv/airing_today", {
        params: { page },
      });

      const response = {
        message: "Airing Today TV Shows",
        page: tv?.page,
        totalPages: tv?.total_pages,
        data: tv?.results,
      };

      return Res(response);
    }

    if (onTheAir === TRUE) {
      const tv = await serverAxios.get("/tv/on_the_air", { params: { page } });

      const response = {
        message: "On The Air TV Shows",
        page: tv?.page,
        totalPages: tv?.total_pages,
        data: tv?.results,
      };

      return Res(response);
    }

    if (popular === TRUE) {
      const tv = await serverAxios.get("/tv/popular", { params: { page } });

      const response = {
        message: "Popular TV Shows",
        page: tv?.page,
        totalPages: tv?.total_pages,
        data: tv?.results,
      };

      return Res(response);
    }
    if (topRated === TRUE) {
      const tv = await serverAxios.get("/tv/top_rated", { params: { page } });

      const response = {
        message: "Top Rated TV Shows",
        page: tv?.page,
        totalPages: tv?.total_pages,
        data: tv?.results,
      };

      return Res(response);
    }

    if (all === TRUE) {
      const tv = await Promise.all([
        serverAxios.get("/tv/airing_today", { params: { page } }),
        serverAxios.get("/tv/on_the_air", { params: { page } }),
        serverAxios.get("/tv/popular", { params: { page } }),
        serverAxios.get("/tv/top_rated", { params: { page } }),
      ]);

      const totalPageArray = tv?.map((obj) => {
        return obj.total_pages;
      });

      const totalPages = findSmallestNumber(totalPageArray);

      const response = {
        message: "All TV Shows",
        page: tv[0]?.page,
        totalPages,
        airingToday: tv[0]?.results,
        onTheAir: tv[1]?.results,
        popular: tv[2]?.results,
        topRated: tv[3]?.results,
      };

      return Res(response);
    }
    return Res({ error: "Error in  query" }, { status: 404 });
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
