import { gql } from "@apollo/client";

export const getPersonDetailDataQuery = "getPersonDetail";

const personDetailSchema = gql`
  query GetPersonDetail($id: ID!) {
    getPersonDetail(id: $id) {
      biography
      birthday
      deathday
      id
      known_for_department
      name
      place_of_birth
      profile_path
    }
  }
`;

export default personDetailSchema;
