import { gql } from "@apollo/client";

export const getFixedDataQuery = "getFixed";

const fixedSchema = gql`
  query GetFixed {
    getFixed {
      imageDetail {
        base_url
        secure_base_url
        backdrop_sizes
        logo_sizes
        poster_sizes
        profile_sizes
        still_sizes
      }
      genres {
        id
        name
      }
      countries {
        iso_3166_1
        english_name
        native_name
        name
      }
    }
  }
`;
export default fixedSchema;
