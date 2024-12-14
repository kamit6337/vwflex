import { gql } from "@apollo/client";

const nowPlayingSchema = gql`
  query GetNowPlayingMovies($page: Int!) {
    getNowPlayingMovies(page: $page) {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default nowPlayingSchema;
