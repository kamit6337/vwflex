import { gql } from "@apollo/client";

export const postWatchlistTvShowDataQuery = "postWatchlistTvShow";

const createTvWatchlistSchema = gql`
  mutation CreateTvWatchlistSchema($id: ID!, $season: ID!) {
    postWatchlistTvShow(id: $id, season: $season) {
      id
      bool
    }
  }
`;

export default createTvWatchlistSchema;
