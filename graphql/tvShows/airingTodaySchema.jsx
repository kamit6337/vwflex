import { gql } from "@apollo/client";

const airingTodaySchema = gql`
  query GET_AIRING_TODAY($page: Int!) {
    getAiringTodayTvShows(page: $page) {
      backdrop_path
      id
      name
      first_air_date
      overview
      vote_average
    }
  }
`;
export default airingTodaySchema;
