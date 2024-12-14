import { gql } from "@apollo/client";

export const getWatchlistMoviesDataQuery = "getWatchlistMovies";

const getWatchlistMovieSchema = gql`
  query GetWatchlistMovies {
    getWatchlistMovies {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default getWatchlistMovieSchema;
