import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import serverAxios from "@utils/server/serverAxios";

export const GET = async (request) => {
  const { query } = Req(request);

  const { q, page = 1 } = query;

  if (!q) {
    return Res({ error: "Search string not provided" }, { status: 404 });
  }

  try {
    const search = await serverAxios.get("/search/multi", {
      params: { query: q, page },
    });

    const movieSearch = search?.results?.filter((obj) => {
      return obj.media_type === "movie";
    });

    const tvSearch = search?.results?.filter((obj) => {
      return obj.media_type === "tv";
    });

    const personSearch = search?.results?.filter((obj) => {
      return obj.media_type === "person";
    });

    const response = {
      page: search?.page,
      totalPages: search?.total_pages,
      movies: movieSearch,
      tv: tvSearch,
      peoples: personSearch,
    };

    return Res(response);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
