import clientAxios from "@utils/client/clientAxios";

const airingTodayList = async (page = 1) => {
  "use server";

  return clientAxios.get("/tv", {
    params: { airingToday: true, page },
  });
};

export default airingTodayList;
