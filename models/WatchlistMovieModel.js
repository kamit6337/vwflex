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
      default: null,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      default: null,
    },
    vote_average: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const WatchListMovie =
  models.WatchListMovie || model("WatchListMovie", watchlistMovieSchema);

export default WatchListMovie;
