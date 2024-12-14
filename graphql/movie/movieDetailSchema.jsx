import { gql } from "@apollo/client";

export const getMovieDetailDataQuery = "getMovie";

const movieDetailSchema = gql`
  query GetMovieDetails($id: ID!) {
    getMovie(id: $id) {
      adult
      id
      title
      backdrop_path
      release_date
      vote_average
      runtime
      genres {
        id
        name
      }
      production_companies {
        id
        logo_path
        name
        origin_country
      }
      production_countries {
        iso_3166_1
        name
      }
      spoken_languages {
        english_name
        iso_639_1
        name
      }
      revenue
      budget
      overview
    }
  }
`;

export default movieDetailSchema;
