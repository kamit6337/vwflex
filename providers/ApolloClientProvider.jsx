"use client";

// app/lib/apolloClient.js
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  ApolloProvider,
} from "@apollo/client";
import environment from "@utils/environment";

// Define the HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: `${environment.SERVER_URL}/graphql`, // Replace with your GraphQL endpoint
});

// Create a middleware link to add the authorization header
const authLink = new ApolloLink((operation, forward) => {
  // Get the token from wherever it is stored (e.g., cookie, local storage)

  const token =
    typeof window !== "undefined" ? localStorage.getItem("_use") : null; // Replace with your token retrieval logic

  // Set the authorization header
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

// Combine the links
export const client = new ApolloClient({
  link: authLink.concat(httpLink), // Use the auth link before the HTTP link
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
