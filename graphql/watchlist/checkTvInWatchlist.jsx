import { gql } from "@apollo/client";

export const checkTvShowInWatchlistDataQuery = "checkTvShowInWatchlist";

export const checkTvInWatchlist = gql`
  query CheckTvInWatchlist($id: Int!, $season: Int!) {
    checkTvShowInWatchlist(id: $id, season: $season) {
      id
      bool
    }
  }
`;

export default checkTvInWatchlist;
