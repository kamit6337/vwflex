import { gql } from "@apollo/client";

export const getNewMovieWatchlistDataQuery = "postWatchlistMovie";

const createMovieWatchlistSchema = gql`
  mutation GetNewMovieWatchlist($id: ID!) {
    postWatchlistMovie(id: $id) {
      id
      bool
    }
  }
`;

export default createMovieWatchlistSchema;
