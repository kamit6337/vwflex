import Loading from "@containers/Loading";
import MediaReviews from "@components/MediaReviews";
import tvShowReviewSchema, {
  getTvShowReviewsDataQuery,
} from "@graphql/tv/tvShowReviewSchema";
import { useQuery } from "@apollo/client";

const Reviews = ({ id, fixed }) => {
  const { loading, data, error } = useQuery(tvShowReviewSchema, {
    variables: { id: Number(id) },
  });

  if (loading) {
    return (
      <div className="w-full h-96">
        <Loading />
      </div>
    );
  }

  if (error || !data || data[getTvShowReviewsDataQuery]?.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have reviews</p>
      </div>
    );
  }

  const reviews = data[getTvShowReviewsDataQuery];

  return <MediaReviews fixed={fixed} reviews={reviews} />;
};

export default Reviews;
