import clientAxios from "@utils/client/clientAxios";

const fetchPersonDetails = async (id) => {
  return clientAxios.get("/person", {
    params: { id, images: true, credits: true },
  });
};

export default fetchPersonDetails;
