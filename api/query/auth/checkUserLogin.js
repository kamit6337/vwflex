import clientAxios from "@utils/client/clientAxios";

const checkUserLogin = async () => {
  return clientAxios.get("/loginCheck", { cache: false });
};

export default checkUserLogin;
