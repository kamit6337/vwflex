import { gql } from "@apollo/client";

const topRatedMoviesSchema = gql`
  query GetTopRatedMovies($page: Int!) {
    getTopRatedMovies(page: $page) {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default topRatedMoviesSchema;
