import { gql } from "@apollo/client";

export const getTvShowSimilarDataQuery = "getTvShowSimilar";

const tvShowSimilarSchema = gql`
  query GetTvShowSimilar($page: Int!, $id: Int!) {
    getTvShowSimilar(page: $page, id: $id) {
      backdrop_path
      id
      name
      first_air_date
      overview
      vote_average
    }
  }
`;

export default tvShowSimilarSchema;
