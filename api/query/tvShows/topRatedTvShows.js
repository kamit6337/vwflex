import clientAxios from "@utils/client/clientAxios";

const topRatedTvShows = async (page = 1) => {
  "use server";

  return clientAxios.get("/tv", {
    params: { topRated: true, page },
  });
};

export default topRatedTvShows;
