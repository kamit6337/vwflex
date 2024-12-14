import { gql } from "@apollo/client";

export const getPersonCreditsDataQuery = "getPersonCredits";

const personCreditSchema = gql`
  query GetPersonCredits($id: ID!) {
    getPersonCredits(id: $id) {
      movies {
        backdrop_path
        id
        overview
        release_date
        title
        vote_average
      }
      tv {
        backdrop_path
        id
        name
        first_air_date
        overview
        vote_average
      }
    }
  }
`;

export default personCreditSchema;
