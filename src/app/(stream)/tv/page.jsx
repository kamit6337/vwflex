import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Tv from "./Tv";
import GetReq from "@utils/client/GetReq";

export default async function TvPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tvList"],
    queryFn: () => GetReq("/tv", { popular: true }),
    staleTime: 180000,
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Tv />
    </HydrationBoundary>
  );
}
