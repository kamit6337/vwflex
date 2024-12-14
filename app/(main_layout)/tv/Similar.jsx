import { useQuery } from "@apollo/client";
import HorizontalList from "@components/HorizontalList";
import { TV } from "@constants/mediaType";
import Loading from "@containers/Loading";
import tvShowSimilarSchema, {
  getTvShowSimilarDataQuery,
} from "@graphql/tv/tvShowSimilarSchema";

const Similar = ({ id, fixed }) => {
  const { loading, data, error } = useQuery(tvShowSimilarSchema, {
    variables: { id: Number(id), page: 1 },
  });

  if (loading) {
    return (
      <div className="w-full h-96 ">
        <Loading />
      </div>
    );
  }

  if (error || !data || data[getTvShowSimilarDataQuery]?.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>{error.message}</p>
        <p>Sorry, we do not have Recommended TV Shows data</p>
      </div>
    );
  }

  const initialData = data[getTvShowSimilarDataQuery];

  return (
    <>
      <HorizontalList
        id={id}
        schema={tvShowSimilarSchema}
        dataQuery={getTvShowSimilarDataQuery}
        fixed={fixed}
        initialData={initialData}
        media={TV}
      />
    </>
  );
};

export default Similar;
