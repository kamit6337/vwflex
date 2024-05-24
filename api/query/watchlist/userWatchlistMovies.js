import catchAsyncError from "@lib/catchAsyncError";
import WatchListMovie from "@models/WatchlistMovieModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

const userWatchlistMovies = catchAsyncError(async () => {
  const token = cookies().get("token");

  if (!token) {
    throw new Error("You session has expired. Please login again");
  }

  const decoded = verifyWebToken(token.value);
  const userId = decoded.id;

  await connectToDB();

  const movies = await WatchListMovie.find({
    user: userId,
  })
    .lean()
    .sort("-createdAt");

  const serializedMovies = movies.map((obj) => {
    return makeSerializable(obj);
  });

  return serializedMovies;
});

export default userWatchlistMovies;
