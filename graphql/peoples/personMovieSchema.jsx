import { gql } from "@apollo/client";

export const getPersonMovieCreditsDataQuery = "getPersonMovieCredits";

const personMovieSchema = gql`
  query GetPersonMovieCredits($id: ID!) {
    getPersonMovieCredits(id: $id) {
      backdrop_path
      id
      overview
      release_date
      title
      vote_average
    }
  }
`;

export default personMovieSchema;
