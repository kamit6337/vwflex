import { gql } from "@apollo/client";

export const getMovieImagesDataQuery = "getMovieImages";

const movieImagesSchema = gql`
  query GetMovieImages($id: ID!) {
    getMovieImages(id: $id) {
      ratio
      path
    }
  }
`;

export default movieImagesSchema;
