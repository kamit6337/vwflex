"use server";

import catchAsyncError from "@lib/catchAsyncError";
import Watchlist from "@models/WartchlistModel";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";

const removeFromWatchlist = catchAsyncError(
  async (_id, { movieId, tvId, season } = {}) => {
    if (!_id) {
      throw new Error("Watchlist Id is not provided");
    }

    await connectToDB();

    if (movieId) {
      const updateWatchlist = await Watchlist.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          $pull: { movies: movieId },
        },
        {
          new: true,
        }
      ).lean();

      return makeSerializable(updateWatchlist);
    }

    if (tvId && season) {
      const updateWatchlist = await Watchlist.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          $pull: { tv: { id: tvId, season: season } },
        },
        {
          new: true,
        }
      ).lean();

      return makeSerializable(updateWatchlist);
    }

    throw new Error("please provide all value");
  }
);

export default removeFromWatchlist;
