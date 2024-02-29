import { Schema, models, model } from "mongoose";

const watchlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    movies: [String],
    tv: [
      {
        _id: false,
        id: String,
        season: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Watchlist = models.Watchlist || model("Watchlist", watchlistSchema);

export default Watchlist;
