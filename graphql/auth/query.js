import loginCheckSchema, { getLoginCheckDataQuery } from "./loginCheckSchema";
import cachedQuery from "@graphql/query/cachedQuery";

export const checkUserLogin = cachedQuery(
  loginCheckSchema,
  getLoginCheckDataQuery
);
