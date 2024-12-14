import fixedSchema, { getFixedDataQuery } from "./fixedSchema";
import cachedQuery from "@graphql/query/cachedQuery";

const getFixedData = async () => {
  return await cachedQuery(fixedSchema, getFixedDataQuery);
};

// unstable_cache(async () => {
//   const query = await client.query({
//     query: fixedSchema,
//   });

//   return { ...query, data: query?.data[getFixedDataQuery] };
// }, ["GET_FIXED"]); // A unique cache key

export default getFixedData;
