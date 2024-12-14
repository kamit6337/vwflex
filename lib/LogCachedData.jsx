"use client";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";

const LogCacheData = () => {
  const client = useApolloClient();

  useEffect(() => {
    const cachedData = client.cache.extract();
    console.log("Apollo Cache Data:", cachedData);
  }, [client]);

  return null; // This is just a utility component
};

export default LogCacheData;
