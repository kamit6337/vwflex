import clientAxios from "@utils/client/clientAxios";

const popularTvShowsList = async (page = 1) => {
  "use server";

  return clientAxios.get("/tv", {
    params: { popular: true, page },
  });
};

export default popularTvShowsList;
