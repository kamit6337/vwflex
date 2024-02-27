import clientAxios from "@utils/client/clientAxios";
import queryList from "./queryList";

export const fixed = async () => {
  "use server";

  return clientAxios.get("/fixed", { revalidate: Infinity });
};

const initialFetch = async () => {
  const promises = queryList.filter((query) => query.instant);

  const query = await Promise.all([
    fixed(),
    promises.map((promise) => promise.promise()),
  ]);

  return query;
};

export default initialFetch;
