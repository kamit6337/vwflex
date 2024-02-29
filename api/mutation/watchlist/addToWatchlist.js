"use server";

import catchAsyncError from "@lib/catchAsyncError";
import Watchlist from "@models/WartchlistModel";
import makeSerializable from "@utils/javascript/makeSerializable";
import connectToDB from "@utils/mongoose/connectToDB";

const addToWatchlist = catchAsyncError(
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
          $push: {
            movies: {
              $each: [movieId],
              $position: 0,
            },
          },
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
          $push: {
            tv: {
              $each: [{ id: tvId, season: season }],
              $position: 0,
            },
          },
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

export default addToWatchlist;
