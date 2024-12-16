import { gql } from "@apollo/client";

export const deleteWatchlistTvShowDataQuery = "deleteWatchlistTvShow";

const removeTvWatchlistSchema = gql`
  mutation RemoveTvWatchlist($id: ID!, $season: ID!) {
    deleteWatchlistTvShow(id: $id, season: $season) {
      id
      bool
    }
  }
`;

export default removeTvWatchlistSchema;
