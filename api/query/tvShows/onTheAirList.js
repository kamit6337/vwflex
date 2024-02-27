import clientAxios from "@utils/client/clientAxios";

const onTheAirList = async (page = 1) => {
  "use server";

  return clientAxios.get("/tv", {
    params: { onTheAir: true, page },
  });
};

export default onTheAirList;
