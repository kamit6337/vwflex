import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import environment from "@utils/environment";

const httpLink = new HttpLink({
  uri: `${environment.SERVER_URL}/graphql`,
});

// Create a middleware link to add the authorization header
const authMiddleware = (token) =>
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }));
    return forward(operation);
  });

const createClient = (token) =>
  new ApolloClient({
    ssrMode: true,
    link: concat(authMiddleware(token), httpLink),
    cache: new InMemoryCache(),
    devtools: {
      enabled: true,
    },
  });

export default createClient;
