"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { QueryClient } from "@tanstack/react-query";
import { getReq } from "@utils/api/serverApi";

const queryClient = new QueryClient();

const url_list = [
  "/configuration",
  "/genre/movie/list",
  "/genre/tv/list",
  "/configuration/countries",
];

const getFixed = catchAsyncError(async () => {
  const response = {};

  const [images, movieGenres, tvGenres, countries] = await Promise.all([
    getReq("/configuration"),
    getReq("/genre/movie/list"),
    getReq("/genre/tv/list"),
    getReq("/configuration/countries"),
  ]);

  // const [images, movieGenres, tvGenres, countries] = await Promise.all(
  //   url_list.map(async (path) => {
  //     return queryClient.fetchQuery({
  //       queryKey: ["fixed", path],
  //       queryFn: () => getReq(path),
  //       staleTime: Infinity,
  //     });
  //   })
  // );

  response.imageDetail = images.images;
  const newGenres = new Set([...movieGenres.genres, ...tvGenres.genres]);
  response.genres = [...newGenres];
  response.countries = countries;

  return response;
});

export default getFixed;

// const [images, movieGenres, tvGenres, countries] = await Promise.all([
//   getReq("/configuration"),
//   getReq("/genre/movie/list"),
//   getReq("/genre/tv/list"),
//   getReq("/configuration/countries"),
// ]);
