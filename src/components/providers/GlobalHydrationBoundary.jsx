import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import GetReq from "@utils/client/GetReq";

export default async function GlobalHydrationBoundary({ children }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tvList"],
    queryFn: () => GetReq("/tv", { all: true }),
    staleTime: 240000,
  });

  await queryClient.prefetchQuery({
    queryKey: ["moviesList"],
    queryFn: () => GetReq("/movies", { all: true }),
    staleTime: 240000,
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
