import { gql } from "@apollo/client";

export const getMovieReviewsDataQuery = "getMovieReviews";

const movieReviewsSchema = gql`
  query GetMovieReviews($id: Int!) {
    getMovieReviews(id: $id) {
      author
      author_details {
        name
        username
        avatar_path
        rating
      }
      content
      created_at
      id
      updated_at
      url
    }
  }
`;

export default movieReviewsSchema;
