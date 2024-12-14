import { gql } from "@apollo/client";

export const getTvShowDetailDataQuery = "getTvShowDetails";

const tvDetailSchema = gql`
  query GetTvShowDetail($id: Int!) {
    getTvShowDetails(id: $id) {
      adult
      backdrop_path
      created_by {
        id
        name
        original_name
        profile_path
      }
      first_air_date
      genres {
        id
        name
      }
      id
      last_air_date
      name
      number_of_seasons
      number_of_episodes
      original_name
      origin_country
      overview
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
      tagline
      vote_average
    }
  }
`;

export default tvDetailSchema;
