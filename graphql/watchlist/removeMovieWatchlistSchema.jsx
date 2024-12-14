import { gql } from "@apollo/client";

export const removeMovieWatchlistDataQuery = "deleteWatchlistMovie";

const removeMovieWatchlistSchema = gql`
  mutation RemoveMovieFromWatchlist($id: Int!) {
    deleteWatchlistMovie(id: $id) {
      id
      bool
    }
  }
`;

export default removeMovieWatchlistSchema;
