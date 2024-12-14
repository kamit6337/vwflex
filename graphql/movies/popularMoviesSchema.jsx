import { gql } from "@apollo/client";

const popularMoviesSchema = gql`
  query GetPopularMovies($page: Int!) {
    getPopularMovies(page: $page) {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default popularMoviesSchema;
