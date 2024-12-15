import { gql } from "@apollo/client";

export const getTvShowSeasonDetailDataQuery = "getTvShowSeason";

const tvSeasonSchema = gql`
  query GetTvShowSeasonDetail($id: Int!, $season: Int!) {
    getTvShowSeason(id: $id, season: $season) {
      id
      poster_path
      overview
      air_date
      name
      season_number
      vote_average
      episodes {
        air_date
        episode_number
        name
        overview
        runtime
        season_number
        show_id
        still_path
        vote_average
        vote_count
      }
    }
  }
`;

export default tvSeasonSchema;
