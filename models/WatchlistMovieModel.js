import { Schema, model, models } from "mongoose";

const watchlistMovieSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const WatchListMovie =
  models.WatchListMovie || model("WatchListMovie", watchlistMovieSchema);

export default WatchListMovie;
