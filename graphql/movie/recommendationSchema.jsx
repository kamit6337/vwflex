import { gql } from "@apollo/client";

export const getMovieRecommendationsDataQuery = "getMovieRecommendations";

const recommendationSchema = gql`
  query GetMovieRecommendations($page: Int!, $id: Int!) {
    getMovieRecommendations(page: $page, id: $id) {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default recommendationSchema;
