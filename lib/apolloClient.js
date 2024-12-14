import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import environment from "@utils/environment";
import { cookies } from "next/headers";

const httpLink = new HttpLink({
  uri: `${environment.SERVER_URL}/graphql`,
});

// Create a middleware link to add the authorization header
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = cookies().get("_use")?.value || "";

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

// Combine the links
export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  devtools: {
    enabled: true,
  },
});
