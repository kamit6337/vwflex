import { gql } from "@apollo/client";

export const postWatchlistTvShowDataQuery = "postWatchlistTvShow";

const createTvWatchlistSchema = gql`
  mutation CreateTvWatchlistSchema($id: Int!, $season: Int!) {
    postWatchlistTvShow(id: $id, season: $season) {
      id
      bool
    }
  }
`;

export default createTvWatchlistSchema;
