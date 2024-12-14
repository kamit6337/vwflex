import { gql } from "@apollo/client";

export const getNewMovieWatchlistDataQuery = "postWatchlistMovie";

const createMovieWatchlistSchema = gql`
  mutation GetNewMovieWatchlist($id: Int!) {
    postWatchlistMovie(id: $id) {
      id
      bool
    }
  }
`;

export default createMovieWatchlistSchema;
