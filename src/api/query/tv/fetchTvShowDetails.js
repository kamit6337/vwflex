import clientAxios from "@utils/client/clientAxios";

const fetchTvShowDetails = async (id, season = null) => {
  "use server";

  return clientAxios.get("/tv/season", {
    params: {
      id,
      season,
      images: true,
      recommendations: true,
      similar: true,
    },
  });
};

export default fetchTvShowDetails;
