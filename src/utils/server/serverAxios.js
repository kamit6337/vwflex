import Fetch from "@lib/fetcher";
import environment from "@utils/environment";

const serverAxios = new Fetch(environment.THIRD_PARTY_URL, {
  accessToken: environment.THIRD_PARTY_URL_ACCESS_TOKEN,
  willCache: false,
});

export default serverAxios;
