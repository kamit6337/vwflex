import { gql } from "@apollo/client";

export const getSimilarMovieDataQuery = "getSimilarMovies";

const similarSchema = gql`
  query GetSimilarMovies($page: Int!, $id: Int!) {
    getSimilarMovies(page: $page, id: $id) {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default similarSchema;
