"use client";
import { ApolloProvider } from "@apollo/client";
import clientApollo from "@lib/clientApollo";

const ApolloClientProvider = ({ children }) => {
  return <ApolloProvider client={clientApollo}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
