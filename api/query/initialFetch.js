"use server";
import queryList from "./queryList";
import catchAsyncError from "@lib/catchAsyncError";
import serverAxios from "@utils/server/serverAxios";

export const fixed = catchAsyncError(async () => {
  const response = {};

  const [images, movieGenres, tvGenres, countries] = await Promise.all([
    serverAxios.get("/configuration"),
    serverAxios.get("/genre/movie/list"),
    serverAxios.get("/genre/tv/list"),
    serverAxios.get("/configuration/countries"),
  ]);

  response.imageDetail = images.images;
  const newGenres = new Set([...movieGenres.genres, ...tvGenres.genres]);
  response.genres = [...newGenres];
  response.countries = countries;

  return response;
});

const initialFetch = async () => {
  const promises = queryList.filter((query) => query.instant);

  const query = await Promise.all([
    fixed(),
    promises.map((promise) => promise.promise()),
  ]);

  return query;
};

export default initialFetch;
