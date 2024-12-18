import createClient from "@lib/apolloClient";
import getAuthToken from "@utils/getAuthToken";
import { unstable_cache } from "next/cache";

const makeQuery = (schema, dataQuery, { id, page, season } = {}, token) => {
  return unstable_cache(
    async () => {
      const client = createClient(token);
      const query = await client.query({
        query: schema,
        variables: { id: id ? Number(id) : null, page, season: Number(season) },
        errorPolicy: "all",
      });

      return { ...query, data: query.data[dataQuery] };
    },
    [dataQuery, id?.toString(), page?.toString(), season?.toString()],
    {
      tags: [
        dataQuery,
        id ? `id:${id}` : null, // Use formatted strings to make tags more identifiable
        page ? `page:${page}` : null,
        season ? `season:${season}` : null,
      ].filter(Boolean), // Filter out any `null` or `undefined` values from the tags,
      revalidate: 60 * 5, // 5 minutes
    }
  );
};

// Export a function that uses `cachedQuery` with the token
const cachedQuery = async (schema, dataQuery, options = {}) => {
  const token = getAuthToken();

  return await makeQuery(schema, dataQuery, options, token)();
};

export default cachedQuery;
