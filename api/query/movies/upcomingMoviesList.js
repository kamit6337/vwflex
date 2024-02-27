import clientAxios from "@utils/client/clientAxios";

const upcomingMoviesList = async (page = 1) => {
  "use server";

  return clientAxios.get("/movies", {
    params: { upcoming: true, page },
  });
};

export default upcomingMoviesList;
