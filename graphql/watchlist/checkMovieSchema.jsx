import { gql } from "@apollo/client";

export const getMovieInWatchlistDataQuery = "checkMovieInWatchlist";

const checkMovieSchema = gql`
  query GetMovieInWatchlist($id: Int!) {
    checkMovieInWatchlist(id: $id) {
      id
      bool
    }
  }
`;

export default checkMovieSchema;
