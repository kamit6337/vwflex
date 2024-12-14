import { gql } from "@apollo/client";

export const getPopularPeoplesDataQuery = "getPopularPeoples";

const popularPeoplesSchema = gql`
  query GetPopularPeoples($page: Int!) {
    getPopularPeoples(page: $page) {
      id
      known_for_department
      name
      original_name
      popularity
      profile_path
      known_for {
        ... on Movie {
          title
          media_type
        }
        ... on TV {
          name
          media_type
        }
      }
    }
  }
`;

export default popularPeoplesSchema;
