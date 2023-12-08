import findSmallestNumber from "@utils/javascript/findSmallestNumber";
import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import fetchReq from "@utils/server/fetchReq";

const TRUE = "true";

export const GET = async (request) => {
  const { query } = Req(request);

  const { airingToday, onTheAir, popular, topRated, all, page = 1 } = query;

  if (!query) {
    return Res({ error: "Query is not provided" }, { status: 404 });
  }

  try {
    if (airingToday === TRUE) {
      const tv = await fetchReq("/tv/airing_today", { page });

      const response = {
        message: "Airing Today TV Shows",
        page: tv?.page,
        totalPages: tv?.total_pages,
        data: tv?.results,
      };

      return Res(response);
    }

    if (onTheAir === TRUE) {
      const tv = await fetchReq("/tv/on_the_air", { page });

      const response = {
        message: "On The Air TV Shows",
        page: tv?.page,
        totalPages: tv?.total_pages,
        data: tv?.results,
      };

      return Res(response);
    }

    if (popular === TRUE) {
      const tv = await fetchReq("/tv/popular", { page });

      const response = {
        message: "Popular TV Shows",
        page: tv?.page,
        totalPages: tv?.total_pages,
        data: tv?.results,
      };

      return Res(response);
    }
    if (topRated === TRUE) {
      const tv = await fetchReq("/tv/top_rated", { page });

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
        fetchReq("/tv/airing_today", { page }),
        fetchReq("/tv/on_the_air", { page }),
        fetchReq("/tv/popular", { page }),
        fetchReq("/tv/top_rated", { page }),
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
