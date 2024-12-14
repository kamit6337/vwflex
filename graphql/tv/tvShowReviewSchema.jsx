import { gql } from "@apollo/client";

export const getTvShowReviewsDataQuery = "getTvShowReviews";

const tvShowReviewSchema = gql`
  query GetTvShowReviews($id: Int!) {
    getTvShowReviews(id: $id) {
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
export default tvShowReviewSchema;
