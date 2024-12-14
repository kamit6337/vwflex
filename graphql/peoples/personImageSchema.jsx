import { gql } from "@apollo/client";

export const getPersonImagesDataQuery = "getPersonImages";

const personImageSchema = gql`
  query GetPersonImages($id: ID!) {
    getPersonImages(id: $id) {
      ratio
      path
    }
  }
`;

export default personImageSchema;
