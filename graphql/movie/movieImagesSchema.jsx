import { gql } from "@apollo/client";

export const getMovieImagesDataQuery = "getMovieImages";

const movieImagesSchema = gql`
  query GetMovieImages($id: Int!) {
    getMovieImages(id: $id) {
      ratio
      path
    }
  }
`;

export default movieImagesSchema;
