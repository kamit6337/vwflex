import fixedSchema, { getFixedDataQuery } from "./fixedSchema";
import cachedQuery from "@graphql/query/cachedQuery";

const getFixedData = async () => {
  return await cachedQuery(fixedSchema, getFixedDataQuery);
};

export default getFixedData;
