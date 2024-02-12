import clientAxios from "@utils/client/clientAxios";

const topRatedMoviesList = async (page = 1) => {
  "use server";

  return clientAxios.get("/movies", {
    params: { topRated: true, page },
  });
};

export default topRatedMoviesList;
