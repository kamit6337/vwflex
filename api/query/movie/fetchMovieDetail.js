import clientAxios from "@utils/client/clientAxios";

const fetchMovieDetail = async (id) => {
  return clientAxios.get("/movie", {
    params: {
      id,
      images: true,
      recommendations: true,
      reviews: true,
      similar: true,
    },
  });
};

export default fetchMovieDetail;
