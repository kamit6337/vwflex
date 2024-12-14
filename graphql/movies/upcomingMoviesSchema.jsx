import { gql } from "@apollo/client";

const upcomingMoviesSchema = gql`
  query GetUpcomingMovies($page: Int!) {
    getUpcomingMovies(page: $page) {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default upcomingMoviesSchema;
