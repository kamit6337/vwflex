import Fetch from "@lib/fetcher";
import environment from "@utils/environment";

const url = `${environment.SERVER_URL}/api`;

const clientAxios = new Fetch(url, { revalidation: 60 * 15 });

export default clientAxios;
