import { gql } from "@apollo/client";

export const deleteWatchlistTvShowDataQuery = "deleteWatchlistTvShow";

const removeTvWatchlistSchema = gql`
  mutation RemoveTvWatchlist($id: Int!, $season: Int!) {
    deleteWatchlistTvShow(id: $id, season: $season) {
      id
      bool
    }
  }
`;

export default removeTvWatchlistSchema;
