import Req from "@utils/server/Req";
import Res from "@utils/server/Res";
import fetchReq from "@utils/server/fetchReq";

export const GET = async (request) => {
  const { query } = Req(request);

  const { page = 1 } = query;

  try {
    const peoples = await fetchReq("/person/popular", { page });

    const response = {
      message: "Popular Peoples List",
      page: peoples.page,
      totalPages: peoples.total_pages,
      data: peoples.results,
    };

    return Res(response);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
};
