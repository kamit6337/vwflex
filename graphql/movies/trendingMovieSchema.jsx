import { gql } from "@apollo/client";

export const getTrendingMoviesDataQuery = "getTrendingMovies";

const trendingMovieSchema = gql`
  query GetTrendingMovies($time: String!) {
    getTrendingMovies(time: $time) {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default trendingMovieSchema;
