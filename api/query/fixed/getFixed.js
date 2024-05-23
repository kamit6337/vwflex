"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const getFixed = catchAsyncError(async () => {
  const response = {};

  const [images, movieGenres, tvGenres, countries] = await Promise.all([
    getReq("/configuration"),
    getReq("/genre/movie/list"),
    getReq("/genre/tv/list"),
    getReq("/configuration/countries"),
  ]);

  response.imageDetail = images.images;
  const newGenres = new Set([...movieGenres.genres, ...tvGenres.genres]);
  response.genres = [...newGenres];
  response.countries = countries;

  return response;
});

export default getFixed;
