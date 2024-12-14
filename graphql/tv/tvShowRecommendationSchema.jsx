import { gql } from "@apollo/client";

export const getTvShowRecommendationsDataQuery = "getTvShowRecommendation";

const tvShowRecommendationSchema = gql`
  query GetTvShowRecommendations($page: Int!, $id: Int!) {
    getTvShowRecommendation(page: $page, id: $id) {
      backdrop_path
      id
      name
      first_air_date
      overview
      vote_average
    }
  }
`;

export default tvShowRecommendationSchema;
