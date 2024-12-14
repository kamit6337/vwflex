import { gql } from "@apollo/client";

export const getTvShowImageDataQuery = "getTvShowImage";

const tvShowImageSchema = gql`
  query GetTvShowImages($id: Int!) {
    getTvShowImage(id: $id) {
      ratio
      path
    }
  }
`;
export default tvShowImageSchema;
