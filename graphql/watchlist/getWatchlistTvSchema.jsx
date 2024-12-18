import { gql } from "@apollo/client";

export const getWatchlistTvShowsDataQuery = "getWatchlistTvShows";

const getWatchlistTvSchema = gql`
  query GetWatchlistTv($page: Int) {
    getWatchlistTvShows(page: $page) {
      id
      poster_path
      overview
      air_date
      name
      season_number
      vote_average
    }
  }
`;

export default getWatchlistTvSchema;
