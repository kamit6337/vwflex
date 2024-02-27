import clientAxios from "@utils/client/clientAxios";

const nowPlayingMoviesList = async (page = 1) => {
  "use server";

  return clientAxios.get("/movies", {
    params: { nowPlaying: true, page },
  });
};

export default nowPlayingMoviesList;
