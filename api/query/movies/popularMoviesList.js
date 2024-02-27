import clientAxios from "@utils/client/clientAxios";

const popularMoviesList = async (page = 1) => {
  "use server";

  return clientAxios.get("/movies", {
    params: { popular: true, page },
  });
};

export default popularMoviesList;
