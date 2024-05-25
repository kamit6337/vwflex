import { Schema, model, models } from "mongoose";

const watchlistTvSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    tvId: {
      type: Number,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
    air_date: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    original_name: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const WatchListTv =
  models.WatchListTv || model("WatchListTv", watchlistTvSchema);

export default WatchListTv;
