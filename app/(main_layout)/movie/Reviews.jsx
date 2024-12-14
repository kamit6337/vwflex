import Loading from "@containers/Loading";
import movieReviewsSchema, {
  getMovieReviewsDataQuery,
} from "@graphql/movie/movieReviewsSchema";
import { useQuery } from "@apollo/client";
import MediaReviews from "@components/MediaReviews";

const Reviews = ({ id, fixed }) => {
  const { loading, data, error } = useQuery(movieReviewsSchema, {
    variables: { id: Number(id) },
  });

  if (loading) {
    return (
      <div className="w-full h-96">
        <Loading />
      </div>
    );
  }

  if (error || !data || data[getMovieReviewsDataQuery]?.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have reviews</p>
      </div>
    );
  }

  const reviews = data[getMovieReviewsDataQuery];

  return <MediaReviews fixed={fixed} reviews={reviews} />;
};

export default Reviews;
