import { gql } from "@apollo/client";

export const getPersonTvCreditsDataQuery = "getPersonTvCredits";

const personTvSchema = gql`
  query GetPersonTvCredits($id: ID!) {
    getPersonTvCredits(id: $id) {
      backdrop_path
      id
      name
      first_air_date
      overview
      vote_average
    }
  }
`;

export default personTvSchema;
