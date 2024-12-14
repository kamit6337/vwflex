import { useQuery } from "@apollo/client";
import HorizontalList from "@components/HorizontalList";
import { MOVIE } from "@constants/mediaType";
import Loading from "@containers/Loading";
import similarSchema, {
  getSimilarMovieDataQuery,
} from "@graphql/movie/similarSchema";

const SimilarMovies = ({ id, fixed }) => {
  const { loading, data, error } = useQuery(similarSchema, {
    variables: { id: Number(id), page: 1 },
  });

  if (loading) {
    return (
      <div className="w-full h-96 ">
        <Loading />
      </div>
    );
  }

  if (error || !data || data[getSimilarMovieDataQuery]?.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>{error.message}</p>
        <p>Sorry, we do not have Similar movies data</p>
      </div>
    );
  }

  const initialData = data[getSimilarMovieDataQuery];

  return (
    <>
      <HorizontalList
        id={id}
        schema={similarSchema}
        dataQuery={getSimilarMovieDataQuery}
        fixed={fixed}
        initialData={initialData}
        media={MOVIE}
      />
    </>
  );
};

export default SimilarMovies;
