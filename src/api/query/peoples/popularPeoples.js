import clientAxios from "@utils/client/clientAxios";

const popularPeoples = async (page = 1) => {
  "use server";

  return clientAxios.get("/peoples", {
    params: { page },
  });
};

export default popularPeoples;
